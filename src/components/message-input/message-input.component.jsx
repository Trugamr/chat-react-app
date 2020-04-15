import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { v4 as uuidv4 } from 'uuid'

import { MdSend, MdAttachFile } from 'react-icons/md'

import FileUploadModal from '../file-upload-modal/file-upload-modal.component'

import 'emoji-mart/css/emoji-mart.css'
import { emojiIndex } from 'emoji-mart'

import {
  Container,
  MessageInputContainer,
  InputField,
  AttachIcon,
  EmojiIcon,
  EmojiPicker,
  SendIcon,
  Spinner,
  ProgressBar,
  EmojiPickerContainer
} from './message-input.styles'

import firebase, {
  firestore,
  storage,
  database
} from '../../firebase/firebase.utils'

import { selectCurrentTheme } from '../../redux/theme/theme.selectors'

class MessageInput extends React.Component {
  state = {
    channelsRef: firestore.collection('channels'),
    storageRef: storage.ref(),
    typingRef: database.ref('typing'),
    uploadeState: '',
    uploadTask: null,
    percentUploaded: 0,
    message: '',
    loading: false,
    errors: [],
    modal: false,
    emojiPicker: false
  }

  componentWillUnmount() {
    if (this.state.uploadTask !== null) {
      this.state.uploadTask.cancel()
      this.setState({
        uploadTask: null
      })
    }
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
    const { message, loading, typingRef } = this.state
    const { currentUser, currentChannel } = this.props

    if (!message || loading) return

    this.setState({ loading: true })

    const [ref, messageRef] = this.getMessageRef()

    ref
      .set(this.createMessage({ id: messageRef.id }))
      .then(() => {
        this.setState({ loading: false, message: '' })
        typingRef.child(currentChannel.id).child(currentUser.uid).remove()
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

  handleKeyDown = () => {
    const { message, typingRef } = this.state
    const { currentChannel, currentUser } = this.props

    if (currentChannel && message.length > 1) {
      typingRef
        .child(currentChannel.id)
        .child(currentUser.uid)
        .set(currentUser.displayName)
    } else if (currentChannel && currentUser) {
      typingRef.child(currentChannel.id).child(currentUser.uid).remove()
    }
  }

  handleTogglePicker = () => {
    this.setState(({ emojiPicker }) => ({
      emojiPicker: !emojiPicker
    }))
  }

  colonsToUnicode = message => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, x => {
      x = x.replace(/:/g, '')
      let emoji = emojiIndex.emojis[x]
      if (typeof emoji !== 'undefined') {
        let unicode = emoji.native
        if (typeof unicode !== 'undefined') {
          return unicode
        }
      }
      x = `:${x}:`
      return x
    })
  }

  handleAddEmoji = emoji => {
    const { message } = this.state
    const newMessage = this.colonsToUnicode(`${message}${emoji.colons}`)
    this.setState(
      {
        message: newMessage,
        emojiPicker: false
      },
      () => this.messageInputRef.focus()
    )
  }

  render() {
    const {
      message,
      loading,
      modal,
      percentUploaded,
      uploadState,
      emojiPicker
    } = this.state
    const { currentChannel, theme } = this.props

    return (
      <Container>
        <EmojiPickerContainer>
          {emojiPicker && (
            <EmojiPicker
              className="emojipicker"
              set="twitter"
              title="Pick an emoji"
              emoji="point_up"
              onSelect={this.handleAddEmoji}
              style={{
                width: '320px'
              }}
              theme={theme.name === 'dark' ? 'dark' : 'light'}
              themeObj={theme}
              color="#007BFF"
            />
          )}
        </EmojiPickerContainer>
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
            ref={node => (this.messageInputRef = node)}
            required
            type="text"
            name="message"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
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
          <EmojiIcon type="button" onClick={this.handleTogglePicker}>
            <span role="img" aria-label="smile">
              🙂
            </span>
          </EmojiIcon>
          <SendIcon type="submit" disabled={loading || !currentChannel}>
            {loading ? <Spinner /> : <MdSend />}
          </SendIcon>
        </MessageInputContainer>
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  theme: selectCurrentTheme
})

export default connect(mapStateToProps)(MessageInput)
