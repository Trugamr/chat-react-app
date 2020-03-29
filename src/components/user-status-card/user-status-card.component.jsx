import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import { FaUser } from 'react-icons/fa'
import { MdExitToApp } from 'react-icons/md'

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

const UserStatusCard = ({
  username = 'Blind Specter',
  photoURL = 'https://i.imgur.com/hCb3ysS.png',
  status = 'online'
}) => {
  const theme = useTheme()
  const [opened, setOpened] = useState(false)

  return (
    <UserAndOptionsContainer opened={opened}>
      <UserStatusCardContainer>
        <UserAvatar>
          <img src={photoURL} alt="user avatar" />
        </UserAvatar>
        <UserInfo>
          <Username>{username}</Username>
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
        <li>
          <FaUser color={theme.userStatusCard.icon} />
          <span>change avatar</span>
        </li>
        <li>
          <MdExitToApp color={theme.userStatusCard.icon} />
          <span>log out</span>
        </li>
      </Options>
    </UserAndOptionsContainer>
  )
}

export default UserStatusCard
