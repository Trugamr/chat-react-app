import React from 'react'

import { AppContainer } from './app.styles'

import SidePanel from '../../components/side-panel/side-panel.component'
import MessagesPanel from '../../components/messages-panel/messages-panel.component'
import MetaPanel from '../../components/meta-panel/meta-panel.component'

const App = () => {
  return (
    <AppContainer>
      <SidePanel />
      <MessagesPanel />
      <MetaPanel />
    </AppContainer>
  )
}

export default App
