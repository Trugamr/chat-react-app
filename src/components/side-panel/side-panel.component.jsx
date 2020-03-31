import React from 'react'

import { SidePanelContainer } from './side-panel.styles'

import UserStatusCard from '../user-status-card/user-status-card.component'
import Starred from '../starred/starred.component'
import Channels from '../channels/channels.component'

const SidePanel = () => {
  return (
    <SidePanelContainer>
      <UserStatusCard />
      <Starred />
      <Channels />
    </SidePanelContainer>
  )
}

export default SidePanel
