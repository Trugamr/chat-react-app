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

import firebase, { database, storage } from '../../firebase/firebase.utils'

class MessageInput extends React.Component {
  state = {
    messagesRef: database.ref('messages'),
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
    const { message, messagesRef, loading } = this.state
    const { currentChannel } = this.props
    if (!message || loading) return

    this.setState({ loading: true })

    messagesRef
      .child(currentChannel.id)
      .push()
      .set(this.createMessage())
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

  createMessage = (fileUrl = null) => {
    const { message } = this.state
    const { currentUser } = this.props

    const createdMessage = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
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

  uploadeFile = file => {
    const { messagesRef, storageRef } = this.state
    const { currentChannel } = this.props
    const pathToUpload = currentChannel.id
    const ref = messagesRef
    const filePath = `chat/public/${uuidv4()}.jpg`

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
                this.sendFileMessage(downloadUrl, ref, pathToUpload)
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

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
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
                ? `message #${currentChannel.name}`
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
