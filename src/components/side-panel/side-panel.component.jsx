import React from 'react'

import { SidePanelContainer } from './side-panel.styles'

import UserStatusCard from '../user-status-card/user-status-card.component'

const SidePanel = () => {
  return (
    <SidePanelContainer>
      <UserStatusCard />
      <div
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#F7D154',
          borderRadius: 14,
          marginTop: 12
        }}
      ></div>
    </SidePanelContainer>
  )
}

export default SidePanel
