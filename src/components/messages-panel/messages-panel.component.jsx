import React from 'react'

import { MessagesPanelContainer } from './messages-panel.styles'

import ChannelHeader from '../channel-header/channel-header.component'
import Messages from '../messages/messages.component'
import MessageInput from '../message-input/message-input.component'

const MessagesPanel = () => {
  return (
    <MessagesPanelContainer>
      <ChannelHeader />
      <Messages />
      <MessageInput />
    </MessagesPanelContainer>
  )
}

export default MessagesPanel
