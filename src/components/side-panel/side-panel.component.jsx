import React from 'react'

import { SidePanelContainer } from './side-panel.styles'

import UserStatusCard from '../user-status-card/user-status-card.component'
import Channels from '../channels/channels.component'

const SidePanel = () => {
  return (
    <SidePanelContainer>
      <UserStatusCard />
      <Channels />
    </SidePanelContainer>
  )
}

export default SidePanel
