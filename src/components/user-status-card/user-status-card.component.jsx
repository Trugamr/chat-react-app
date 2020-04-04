import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useTheme } from 'styled-components'

import { FaUser, FaGlobeAsia } from 'react-icons/fa'
import { MdExitToApp } from 'react-icons/md'

import { auth, database } from '../../firebase/firebase.utils'

import {
  selectCurrentUser,
  selectUserStatus
} from '../../redux/user/user.selectors'

import { setUserStatus } from '../../redux/user/user.actions'

import {
  UserAndOptionsContainer,
  UserStatusCardContainer,
  UserAvatar,
  UserInfo,
  Username,
  UserStatus,
  Indicator,
  OptionsToggle,
  Options,
  Dots,
  Dot,
  Circle,
  Line
} from './user-status-card.styles'

const ArrowSVG = props => {
  const theme = useTheme()

  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18">
      <path
        fill={theme.userStatusCard.icon}
        d="M0 3c-1-1 1-3 2-3h20c2 0 3 2 2 3L14 17a3 3 0 01-4 0L0 3z"
      />
    </svg>
  )
}

const UserStatusCard = ({ currentUser, status, setUserStatus }) => {
  const theme = useTheme()
  const [opened, setOpened] = useState(false)
  const [statusBox, setStatusBox] = useState(false)

  const handleStatusChange = status => {
    setStatusBox(false)

    database
      .ref('presence')
      .child(currentUser.uid)
      .set(status, err => {
        setUserStatus(status)
        if (err) console.error(err)
      })
  }

  const {
    displayName = 'Blind Specter',
    photoURL = 'https://i.imgur.com/hCb3ysS.png'
  } = currentUser

  const handleSignout = () => {
    auth.signOut().then(x => {
      console.log('signed out ')
    })
  }

  return (
    <UserAndOptionsContainer opened={opened}>
      <UserStatusCardContainer>
        <UserAvatar>
          <img src={photoURL} alt="user avatar" />
        </UserAvatar>
        <UserInfo>
          <Username>{displayName}</Username>
          <UserStatus>
            <Indicator status={status} /> <span>{status}</span>
          </UserStatus>
        </UserInfo>
        <OptionsToggle opened={opened}>
          <ArrowSVG onClick={() => setOpened(!opened)} />
        </OptionsToggle>
      </UserStatusCardContainer>

      <Options opened={opened}>
        <Line />
        {statusBox ? null : (
          <li onClick={() => setStatusBox(true)}>
            <FaGlobeAsia color={theme.userStatusCard.icon} />
            <span>set status</span>
          </li>
        )}

        {statusBox ? (
          <li className="status-box">
            <Dots>
              <Dot name="online" onClick={() => handleStatusChange('online')}>
                <Circle name="online" />
              </Dot>
              <Dot name="away" onClick={() => handleStatusChange('away')}>
                <Circle name="away" />
              </Dot>
              <Dot name="offline" onClick={() => handleStatusChange('offline')}>
                <Circle name="offline" />
              </Dot>
            </Dots>
          </li>
        ) : null}

        <li>
          <FaUser color={theme.userStatusCard.icon} />
          <span>change avatar</span>
        </li>
        <li onClick={handleSignout}>
          <MdExitToApp color={theme.userStatusCard.icon} />
          <span>log out</span>
        </li>
      </Options>
    </UserAndOptionsContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  status: selectUserStatus
})

const mapDispatchToProps = dispatch => ({
  setUserStatus: status => dispatch(setUserStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserStatusCard)
