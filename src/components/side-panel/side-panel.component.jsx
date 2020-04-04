import React from 'react'

import { SidePanelContainer } from './side-panel.styles'

import UserStatusCard from '../user-status-card/user-status-card.component'
import Starred from '../starred/starred.component'
import Channels from '../channels/channels.component'
import DirectMessages from '../direct-messages/direct-messages.component'

const SidePanel = () => {
  return (
    <SidePanelContainer>
      <UserStatusCard />
      <Starred />
      <Channels />
      <DirectMessages />
    </SidePanelContainer>
  )
}

export default SidePanel
