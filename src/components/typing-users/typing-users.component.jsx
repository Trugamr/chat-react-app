import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { TypingUsersContainer, User, Dot } from './typing-users.styles'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCurrentChannel } from '../../redux/chat/chat.selectors'

import { database } from '../../firebase/firebase.utils'

class TypingUsers extends React.Component {
  state = {
    typingRef: database.ref('typing'),
    connectedRef: database.ref('.info/connected'),
    typing: {}
  }

  componentDidMount() {
    const { typingRef, connectedRef } = this.state
    const { currentUser } = this.props

    typingRef.on('value', snapshot => {
      this.setState({
        typing: snapshot.val()
      })
    })

    connectedRef.on('value', snapshot => {
      if (snapshot.val() === true) {
        const { currentChannel } = this.props

        typingRef
          .child(currentChannel.id)
          .child(currentUser.uid)
          .onDisconnect()
          .remove(err => {
            if (err) console.error(err)
          })
      }
    })
  }

  componentWillUnmount() {
    const { typingRef, connectedRef } = this.state
    // removing listener
    typingRef.off()
    connectedRef.off()
  }

  getTypingUsers = channelId => {
    const { typing } = this.state
    const { currentUser } = this.props

    if (typing && typing[channelId]) {
      const channel = typing[channelId]
      // user names typing in channel
      return Object.keys(channel)
        .filter(userId => currentUser.uid !== userId)
        .map(userId => channel[userId])
    } else {
      return []
    }
  }

  render() {
    const { currentChannel } = this.props

    return (
      <>
        {this.getTypingUsers(currentChannel.id).length ? (
          <TypingUsersContainer>
            {this.getTypingUsers(currentChannel.id).map((user, index) => (
              <User key={index}>
                <span>{user} </span>
                <Dot style={{ animationDelay: '100ms' }} />
                <Dot style={{ animationDelay: '300ms' }} />
                <Dot style={{ animationDelay: '500ms' }} />
              </User>
            ))}
          </TypingUsersContainer>
        ) : null}
      </>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel
})

export default connect(mapStateToProps)(TypingUsers)
