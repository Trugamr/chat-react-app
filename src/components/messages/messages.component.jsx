import React from 'react'
import { connect } from 'react-redux'

import { MessagesContainer, Container } from './messages.styles'

import Message from '../message/message.component'
import Spinner from '../spinner/spinner.component'

import { updateChannelMembers } from '../../redux/chat/chat.actions'

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

  componentWillUnmount() {
    this.removeListeners()
  }

  addListeners = channelId => {
    const { messagesRef, messageListeners } = this.state

    if (messageListeners.includes(channelId)) {
      // console.log('ALREADY_LISTENING')
    } else {
      this.setState({ loading: true })
      this.setState(
        ({ messageListeners }) => ({
          messageListeners: messageListeners.concat(channelId)
        }),
        () => {
          const channelMessagesRef = messagesRef.child(channelId)

          channelMessagesRef.once('value', snap => {
            if (!snap.exists()) this.setState({ loading: false })
          })

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
      // console.log('ADDING_LISTENER')
    }
  }

  removeListeners = () => {
    const { messagesRef, messageListeners } = this.state
    messageListeners.forEach(channelId => messagesRef.child(channelId).off())
  }

  displayMessages = (messages = []) => {
    const { currentUser } = this.props

    return messages.map((message, i) => {
      const ownMessage = currentUser.uid === message.user.id
      return <Message key={i} message={message} ownMessage={ownMessage} />
    })
  }

  countUniqueMembers = (messages = []) => {
    const uniqueMembers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.id)) {
        acc.push(message.user.id)
      }
      return acc
    }, [])

    return uniqueMembers.length
  }

  render() {
    const { messages, loading } = this.state
    const { currentChannel, updateMembers } = this.props

    // if (currentChannel && !loading) {
    //   updateMembers(this.countUniqueMembers(messages[currentChannel.id]))
    // }

    return (
      <MessagesContainer>
        <Container>
          {currentChannel && !loading ? (
            this.displayMessages(messages[currentChannel.id])
          ) : (
            <Spinner style={{ backgroundColor: 'transparent' }} />
          )}
        </Container>
      </MessagesContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateMembers: members => dispatch(updateChannelMembers(members))
})

export default connect(null, mapDispatchToProps)(Messages)
