import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { MdSend, MdAttachFile } from 'react-icons/md'

import FileUploadModal from '../file-upload-modal/file-upload-modal.component'

import {
  MessageInputContainer,
  InputField,
  AttachIcon,
  EmojiIcon,
  SendIcon,
  Spinner,
  ProgressBar
} from './message-input.styles'

import firebase, { firestore, storage } from '../../firebase/firebase.utils'

class MessageInput extends React.Component {
  state = {
    channelsRef: firestore.collection('channels'),
    storageRef: storage.ref(),
    uploadeState: '',
    uploadTask: null,
    percentUploaded: 0,
    message: '',
    loading: false,
    errors: [],
    modal: false
  }

  handleSubmit = event => {
    event.preventDefault()
    this.sendMessage()
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  sendMessage = () => {
    const { message, loading } = this.state

    if (!message || loading) return

    this.setState({ loading: true })

    const [ref, messageRef] = this.getMessageRef()

    ref
      .set(this.createMessage({ id: messageRef.id }))
      .then(() => {
        this.setState({ loading: false, message: '' })
      })
      .catch(err => {
        console.error(err)
        this.setState(({ errors }) => ({
          errors: errors.concat(err),
          loading: false
        }))
      })
  }

  getMessageRef = () => {
    // return message ref according to public or private channel
    const { currentChannel } = this.props
    const { channelsRef } = this.state

    let ref = null
    let messageRef = null

    if (currentChannel.type === 'direct') {
      const directMessagesRef = firestore.collection(
        `directMessages/${currentChannel.id}`
      )
      messageRef = directMessagesRef.doc()
      ref = directMessagesRef.doc(messageRef.id)
    } else {
      // getting snapshot id first
      messageRef = channelsRef
        .doc(currentChannel.id)
        .collection('messages')
        .doc()
      // setting ref to public channel
      ref = channelsRef
        .doc(currentChannel.id)
        .collection('messages')
        .doc(messageRef.id)
    }

    return [ref, messageRef]
  }

  handleConfirm = file => {
    this.setState({
      modal: false
    })
    this.uploadeFile(file)
    console.log('confirmed', file)
  }

  handleClose = () => {
    this.setState({
      modal: false
    })
    console.log('closed')
  }

  createMessage = ({ id, fileUrl }) => {
    const { message } = this.state
    const { currentUser } = this.props

    const createdMessage = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      id,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      }
    }

    if (fileUrl != null) {
      createdMessage['image'] = fileUrl
    } else {
      createdMessage['content'] = message
    }

    return createdMessage
  }

  getPath = () => {
    const { currentChannel } = this.props
    if (currentChannel && currentChannel.type === 'direct') {
      return `chat/private-${currentChannel.id}`
    } else {
      return 'chat/public'
    }
  }

  uploadeFile = file => {
    const { storageRef } = this.state
    const { currentChannel } = this.props
    const pathToUpload = currentChannel.id
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`

    this.setState(
      {
        uploadState: 'uploading',
        uploadTask: storageRef.child(filePath).put(file)
      },
      () => {
        this.state.uploadTask.on(
          'state_changed',
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            )
            this.setState({ percentUploaded })
          },
          err => {
            console.error(err)

            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: 'error',
              uploadTask: null
            })
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                this.sendFileMessage(downloadUrl, pathToUpload)
              })
              .catch(err => {
                console.error(err)
                this.setState(({ errors, uploadState, uploadTask }) => ({
                  errors: errors.concat(err),
                  uploadState: 'error',
                  uploadTask: null
                }))
              })
          }
        )
      }
    )
  }

  sendFileMessage = (fileUrl, pathToUpload) => {
    const [ref, messageRef] = this.getMessageRef()

    ref
      .set(this.createMessage({ id: messageRef.id, fileUrl }))
      .then(() => {
        this.setState({
          uploadState: 'done'
        })
      })
      .catch(err => {
        console.error(err)
        this.setState(({ errors }) => ({
          errors: errors.concat(err)
        }))
      })
  }

  render() {
    const { message, loading, modal, percentUploaded, uploadState } = this.state
    const { currentChannel } = this.props

    return (
      <>
        <FileUploadModal
          showing={modal}
          confirm={this.handleConfirm}
          close={this.handleClose}
        />
        <MessageInputContainer onSubmit={this.handleSubmit}>
          {uploadState === 'uploading' ? (
            <ProgressBar type="progress" max="100" value={percentUploaded} />
          ) : null}
          <InputField
            required
            type="text"
            name="message"
            onChange={this.handleChange}
            value={message}
            autocomplete="off"
            placeholder={
              currentChannel && currentChannel.name
                ? `message ${currentChannel.type === 'direct' ? '@' : '#'}${
                    currentChannel.name
                  }`
                : 'message'
            }
          />
          <AttachIcon
            type="button"
            onClick={() => this.setState({ modal: true })}
            disabled={uploadState === 'uploading'}
          >
            {uploadState === 'uploading' ? <Spinner /> : <MdAttachFile />}
          </AttachIcon>
          <EmojiIcon type="button">
            <span role="img" aria-label="smile">
              🙂
            </span>
          </EmojiIcon>
          <SendIcon type="submit" disabled={loading || !currentChannel}>
            {loading ? <Spinner /> : <MdSend />}
          </SendIcon>
        </MessageInputContainer>
      </>
    )
  }
}

export default MessageInput
