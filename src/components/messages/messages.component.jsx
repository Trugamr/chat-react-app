import React from 'react'
import { connect } from 'react-redux'

import { MessagesContainer, Container } from './messages.styles'

import Message from '../message/message.component'
import Spinner from '../spinner/spinner.component'

import { updateChannelMembers } from '../../redux/chat/chat.actions'

import { firestore } from '../../firebase/firebase.utils'

class Messages extends React.Component {
  state = {
    messageListeners: {},
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
    const { messageListeners } = this.state

    if (!messageListeners[channelId]) {
      // add listener
      const messagesRef = firestore
        .collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')

      const messageListener = messagesRef.onSnapshot(snapshot => {
        const channelMessages = snapshot.docs.map(message => message.data())

        this.setState(({ messages }) => ({
          messages: { ...messages, [channelId]: channelMessages },
          loading: false
        }))
      })

      // adding listener
      this.setState(({ messageListeners }) => ({
        messageListeners: { ...messageListeners, [channelId]: messageListener },
        loading: true
      }))
    } else {
      // already listening
    }
  }

  removeListeners = () => {
    const { messageListeners } = this.state
    Object.keys(messageListeners).forEach(listener => {
      messageListeners[listener]()
    })
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
