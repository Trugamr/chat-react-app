import React from 'react'
import moment from 'moment'

import {
  MessageContainer,
  Avatar,
  MessageInfo,
  Heading,
  Content
} from './message.styles'

const timeFromNow = timestamp => moment(timestamp).fromNow(true)

const Message = ({ message = {} }) => {
  const { content, timestamp, user } = message

  return (
    <MessageContainer>
      <Avatar>
        <img src={user.avatar} alt="avatar" />
      </Avatar>
      <MessageInfo>
        <Heading>
          <h2>{user.name}</h2> <span>{`${timeFromNow(timestamp)} ago`}</span>
        </Heading>
        <Content>{content}</Content>
      </MessageInfo>
    </MessageContainer>
  )
}

export default Message
