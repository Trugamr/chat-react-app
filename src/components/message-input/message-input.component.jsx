import React from 'react'

import { MdSend, MdAttachFile } from 'react-icons/md'

import {
  MessageInputContainer,
  InputField,
  AttachIcon,
  EmojiIcon,
  SendIcon
} from './message-input.styles'

const handleSubmit = event => {
  event.preventDefault()
  console.log('submitted')
}

const MessageInput = () => {
  return (
    <MessageInputContainer onSubmit={handleSubmit}>
      <InputField type="text" name="message" placeholder="message #general" />
      <AttachIcon type="button">
        <MdAttachFile />
      </AttachIcon>
      <EmojiIcon type="button">
        <span role="img" aria-label="smile">
          🙂
        </span>
      </EmojiIcon>
      <SendIcon type="submit">
        <MdSend />
      </SendIcon>
    </MessageInputContainer>
  )
}

export default MessageInput
