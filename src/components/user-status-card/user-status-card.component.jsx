import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useTheme } from 'styled-components'

import { FaUser, FaGlobeAsia, FaSun, FaMoon } from 'react-icons/fa'
import { MdExitToApp } from 'react-icons/md'

import { auth, database, storage } from '../../firebase/firebase.utils'

import {
  selectCurrentUser,
  selectUserStatus
} from '../../redux/user/user.selectors'

import { setCurrentUser } from '../../redux/user/user.actions'

import { setUserStatus } from '../../redux/user/user.actions'

import { setTheme } from '../../redux/theme/theme.actions'
import { selectCurrentTheme } from '../../redux/theme/theme.selectors'

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

import ChangeAvatarModal from '../change-avatar-modal/change-avatar-modal.component'

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

const UserStatusCard = ({
  currentUser,
  status,
  setUserStatus,
  setCurrentUser,
  currentTheme,
  setTheme
}) => {
  const theme = useTheme()
  const [opened, setOpened] = useState(false)
  const [statusBox, setStatusBox] = useState(false)
  const [modal, showModal] = useState(false)

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

  const handleSignout = () => {
    auth.signOut().then(x => {
      console.log('signed out ')
    })
  }

  const handleModalConfirm = avatarBlob => {
    uploadCroppedImage(avatarBlob)
    showModal(false)
  }

  const handleModalClose = () => {
    showModal(false)
  }

  const updateAvatarImage = url => {
    // just refreshing page to show updated image as url remains same user reset wont help
    window.location.reload()

    // THIS WILL BE USELESS AFTER I UPDATE HOW INITiAL USER AVATAR
    // IMAGE SYSTEM WORKS DUE TO STATIC URLS

    // auth.currentUser
    //   .updateProfile({
    //     photoURL: url
    //   })
    //   .then(() => {
    //     console.log('photoURL updated')
    //   })
    //   .catch(err => console.error(err))

    // firestore
    //   .doc(`users/${currentUser.uid}`)
    //   .update({
    //     avatar: url
    //   })
    //   .then(() => {
    //     console.log('user avatar update')
    //   })
    //   .catch(err => console.error(err))
  }

  const uploadCroppedImage = imageBlob => {
    storage
      .ref()
      .child(`avatars/users/${currentUser.uid}`)
      .put(imageBlob, { contentType: 'image/jpeg' })
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => updateAvatarImage(url))
      })
  }

  const toggleTheme = () => {
    if (currentTheme.name === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const { displayName, photoURL } = currentUser

  return (
    <UserAndOptionsContainer opened={opened}>
      <ChangeAvatarModal
        showing={modal}
        close={handleModalClose}
        confirm={handleModalConfirm}
      />

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

        <li onClick={() => showModal(true)}>
          <FaUser color={theme.userStatusCard.icon} />
          <span>change avatar</span>
        </li>

        <li onClick={() => toggleTheme()}>
          {currentTheme.name === 'light' ? (
            <>
              <FaMoon color={theme.userStatusCard.icon} />
              <span>toggle theme</span>
            </>
          ) : (
            <>
              <FaSun color={theme.userStatusCard.icon} />
              <span>toggle theme</span>
            </>
          )}
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
  status: selectUserStatus,
  currentTheme: selectCurrentTheme
})

const mapDispatchToProps = dispatch => ({
  setUserStatus: status => dispatch(setUserStatus(status)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setTheme: themeName => dispatch(setTheme(themeName))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserStatusCard)
