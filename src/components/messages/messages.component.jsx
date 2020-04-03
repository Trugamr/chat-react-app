import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { MessagesContainer, Container } from './messages.styles'

import Message from '../message/message.component'
import Spinner from '../spinner/spinner.component'

import { updateChannelMembers } from '../../redux/chat/chat.actions'
import { selectMessageSearchFilters } from '../../redux/chat/chat.selectors'

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

  filterMessages = messages => {
    const { filters } = this.props
    const regex = new RegExp(filters.text, 'gi')

    if (messages) {
      const searchResults = messages.reduce((acc, message) => {
        if (
          message.content &&
          (message.content.match(regex) || message.user.name.match(regex))
        ) {
          acc.push(message)
        } else if (message.image && message.user.name.match(regex)) {
          acc.push(message)
        }
        return acc
      }, [])

      return searchResults
    }

    return []
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
      const { messages } = this.state
      const { updateMembers, currentChannel } = this.props

      if (currentChannel && messages[currentChannel.id]) {
        updateMembers(this.countUniqueMembers(messages[currentChannel.id]))
      }
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
    const { currentChannel } = this.props

    return (
      <MessagesContainer>
        <Container>
          {currentChannel && !loading ? (
            this.displayMessages(
              this.filterMessages(messages[currentChannel.id])
            )
          ) : (
            <Spinner style={{ backgroundColor: 'transparent' }} />
          )}
        </Container>
      </MessagesContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  filters: selectMessageSearchFilters
})

const mapDispatchToProps = dispatch => ({
  updateMembers: members => dispatch(updateChannelMembers(members))
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
