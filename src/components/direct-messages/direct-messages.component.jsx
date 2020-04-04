import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { FaPlusSquare } from 'react-icons/fa'

import {
  selectCurrentUser,
  selectUserStatus
} from '../../redux/user/user.selectors'

import { firestore, database } from '../../firebase/firebase.utils'

import Spinner from '../spinner/spinner.component'

import {
  DirectMessagesContainer,
  DirectMessagesHeading,
  DirectMessagesList,
  DirectMessagesItem,
  User,
  Status
} from './direct-messages.styles'

class DirectMessages extends React.Component {
  state = {
    users: [],
    usersListener: null,
    connectedRef: database.ref('.info/connected'),
    presenceRef: database.ref('presence')
  }

  componentDidMount() {
    const { currentUser } = this.props
    if (currentUser) {
      this.addListeners(currentUser.uid)
    }
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  addListeners = currentUserUid => {
    const { connectedRef, presenceRef } = this.state
    const { userStatus } = this.props

    const usersListener = firestore.collection('users').onSnapshot(snapshot => {
      const otherUsers = snapshot.docs.filter(doc => doc.id !== currentUserUid)
      const usersWithDetails = otherUsers.map(user => {
        let userWithDetails = {
          ...user.data(),
          uid: user.id,
          status: 'offline'
        }

        return userWithDetails
      })

      this.setState(
        {
          users: usersWithDetails
        },
        this.updateUsersStatus
      )
    })

    this.setState({
      usersListener
    })

    // setting user presence

    connectedRef.on('value', snapshot => {
      if (snapshot.val()) {
        const ref = presenceRef.child(currentUserUid)
        // set user status from state in case of connection disonnect and reconnect
        // status will be restored from state
        ref.set(userStatus)
        ref.onDisconnect().set('offline')
      }
    })
  }

  removeListeners = () => {
    const { usersListener, connectedRef, presenceRef } = this.state
    const { currentUser } = this.props

    usersListener()
    connectedRef.off()

    // set user status offline
    presenceRef.child(currentUser.uid).set('offline')

    presenceRef.off()
  }

  updateUsersStatus = () => {
    const { presenceRef } = this.state

    presenceRef.on('value', snapshot => {
      const usersPrescence = snapshot.val()
      Object.keys(usersPrescence).forEach(userId => {
        this.addStatusToUser(userId, usersPrescence[userId])
      })
    })
  }

  addStatusToUser = (userId, status = 'online') => {
    const { users } = this.state
    const updatedUsers = users.reduce((acc, user) => {
      if (user.uid === userId) {
        user['status'] = status
      }
      return acc.concat(user)
    }, [])

    this.setState({
      users: updatedUsers
    })
  }

  render() {
    const { users } = this.state

    return (
      <DirectMessagesContainer>
        <DirectMessagesHeading>
          <span>DIRECT MESSAGES</span>
          <FaPlusSquare
            onClick={this.openModal}
            style={{ alignSelf: 'flex-end' }}
            size={20}
          />
        </DirectMessagesHeading>
        {users.length ? (
          <DirectMessagesList>
            {users.map(user => {
              const { uid, name, status = 'offline', selected } = user
              return (
                <DirectMessagesItem key={uid} selected={selected}>
                  <User>
                    <Status status={status} /> <p>{name}</p>
                  </User>
                </DirectMessagesItem>
              )
            })}
          </DirectMessagesList>
        ) : (
          <Spinner
            style={{ backgroundColor: 'transparent', marginTop: 20 }}
            size="40px"
          />
        )}
      </DirectMessagesContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userStatus: selectUserStatus
})

export default connect(mapStateToProps)(DirectMessages)
