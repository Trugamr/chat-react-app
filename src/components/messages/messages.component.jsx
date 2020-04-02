import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { MessagesContainer, Container } from './messages.styles'

import Message from '../message/message.component'
import Spinner from '../spinner/spinner.component'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCurrentChannel } from '../../redux/chat/chat.selectors'

import { database } from '../../firebase/firebase.utils'

class Messages extends React.Component {
  state = {
    messagesRef: database.ref('messages'),
    messageListeners: [],
    messages: {},
    loading: true
  }

  componentDidUpdate() {
    const { currentChannel, currentUser } = this.props

    if (currentChannel && currentUser) {
      this.addListeners(currentChannel.id)
    }
  }

  addListeners = channelId => {
    const { messagesRef, messageListeners } = this.state

    if (messageListeners.includes(channelId)) {
      console.log('ALREADY_LISTENING')
    } else {
      this.setState({ loading: true })
      this.setState(
        ({ messageListeners }) => ({
          messageListeners: messageListeners.concat(channelId)
        }),
        () => {
          const channelMessagesRef = messagesRef.child(channelId)
          console.log(
            channelMessagesRef.once('value', snap => {
              if (!snap.exists()) this.setState({ loading: false })
            })
          )
          channelMessagesRef.on('child_added', snap => {
            this.setState({ loading: false })
            if (!this.state.messages[channelId]) {
              this.setState(({ messages }) => ({
                messages: { ...messages, [channelId]: [snap.val()] }
              }))
            } else {
              this.setState(({ messages }) => ({
                messages: {
                  ...messages,
                  [channelId]: [...messages[channelId], snap.val()]
                }
              }))
            }
          })
        }
      )
      console.log('ADDING_LISTENER')
    }
  }

  displayMessages = (messages = []) => {
    const { currentUser } = this.props

    return messages.map((message, i) => {
      const ownMessage = currentUser.uid === message.user.id
      return <Message key={i} message={message} ownMessage={ownMessage} />
    })
  }

  render() {
    const { messages, loading } = this.state
    const { currentChannel } = this.props

    return (
      <MessagesContainer>
        <Container>
          {currentChannel && !loading ? (
            this.displayMessages(messages[currentChannel.id])
          ) : (
            <Spinner />
          )}
        </Container>
      </MessagesContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel
})

export default connect(mapStateToProps)(Messages)
