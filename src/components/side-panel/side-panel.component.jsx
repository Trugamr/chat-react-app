import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { FaArrowLeft } from 'react-icons/fa'

import { SidePanelContainer, CloseSidebar } from './side-panel.styles'

import UserStatusCard from '../user-status-card/user-status-card.component'
import Starred from '../starred/starred.component'
import Channels from '../channels/channels.component'
import DirectMessages from '../direct-messages/direct-messages.component'

import { selectSidebarShowing } from '../../redux/chat/chat.selectors'
import { toggleSidebar } from '../../redux/chat/chat.actions'

const SidePanel = ({ sidebarShowing, toggleSidebar }) => {
  return (
    <SidePanelContainer sidebarShowing={sidebarShowing}>
      <CloseSidebar onClick={() => toggleSidebar(false)}>
        <FaArrowLeft />
        <span>CLOSE</span>
      </CloseSidebar>
      <UserStatusCard />
      <Starred />
      <Channels />
      <DirectMessages />
    </SidePanelContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  sidebarShowing: selectSidebarShowing
})

const mapDispatchToProps = dispatch => ({
  toggleSidebar: boolean => dispatch(toggleSidebar(boolean))
})

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel)
