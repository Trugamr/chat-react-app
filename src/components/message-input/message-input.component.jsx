import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { MdSend, MdAttachFile } from 'react-icons/md'

import {
  MessageInputContainer,
  InputField,
  AttachIcon,
  EmojiIcon,
  SendIcon,
  Spinner
} from './message-input.styles'

import firebase, { database } from '../../firebase/firebase.utils'

import { selectCurrentChannel } from '../../redux/chat/chat.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

class MessageInput extends React.Component {
  state = {
    messagesRef: database.ref('messages'),
    message: '',
    loading: false,
    errors: []
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

  createMessage = () => {
    const { message } = this.state
    const { currentUser } = this.props

    return {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      },
      content: message
    }
  }

  render() {
    const { message, loading } = this.state
    const { currentChannel } = this.props

    return (
      <MessageInputContainer onSubmit={this.handleSubmit}>
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
        <AttachIcon type="button">
          <MdAttachFile />
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
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentChannel: selectCurrentChannel,
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(MessageInput)
