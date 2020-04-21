import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { MessagesPanelContainer } from './messages-panel.styles'

import ChannelHeader from '../channel-header/channel-header.component'
import Messages from '../messages/messages.component'
import MessageInput from '../message-input/message-input.component'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCurrentChannel } from '../../redux/chat/chat.selectors'

const MessagesPanel = ({ currentUser, currentChannel }) => {
  return (
    <MessagesPanelContainer>
      <ChannelHeader
        currentUser={currentUser}
        currentChannel={currentChannel}
      />
      {/* <div style={{ background: 'red' }} /> */}
      <Messages currentUser={currentUser} currentChannel={currentChannel} />
      <MessageInput currentUser={currentUser} currentChannel={currentChannel} />
    </MessagesPanelContainer>
  )
}

const mapStatToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel
})

export default connect(mapStatToProps)(MessagesPanel)
