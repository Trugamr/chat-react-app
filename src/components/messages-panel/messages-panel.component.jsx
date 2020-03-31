import React from 'react'

import { MessagesPanelContainer } from './messages-panel.styles'

import ChannelHeader from '../channel-header/channel-header.component'
import Messages from '../messages/messages.component'
import MessageSend from '../message-send/message-send.component'

const MessagesPanel = () => {
  return (
    <MessagesPanelContainer>
      <ChannelHeader />
      <Messages />
      <MessageSend />
    </MessagesPanelContainer>
  )
}

export default MessagesPanel
