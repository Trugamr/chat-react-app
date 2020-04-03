import React from 'react'
import moment from 'moment'

import {
  MessageContainer,
  Avatar,
  MessageInfo,
  Heading,
  Content
} from './message.styles'

const timeFromNow = timestamp => {
  if (timestamp) return moment(timestamp.toDate()).fromNow(true)
  else return 'just now'
}

const Message = ({ message = {} }) => {
  const { content, timestamp, user, image } = message

  return (
    <MessageContainer>
      <Avatar>
        <img src={user.avatar} alt="avatar" />
      </Avatar>
      <MessageInfo>
        <Heading>
          <h2>{user.name}</h2> <span>{`${timeFromNow(timestamp)} ago`}</span>
        </Heading>
        <Content image={!!image}>
          {content || <img src={image} alt="message-attachment" />}
        </Content>
      </MessageInfo>
    </MessageContainer>
  )
}

export default Message
