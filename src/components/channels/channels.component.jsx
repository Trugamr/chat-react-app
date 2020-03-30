import React from 'react'

import { FaPlusSquare } from 'react-icons/fa'

import AddChannelModal from '../add-channel-modal/add-channel-modal.component'

import {
  ChannelsContainer,
  ChannelsHeading,
  ChannelsList,
  ChannelItem
} from './channels.styles'

class Channels extends React.Component {
  state = {
    channels: [
      {
        id: '1',
        name: 'react'
      },
      {
        id: '2',
        name: 'ui-design'
      },
      {
        id: '3',
        name: 'memes'
      },
      {
        id: '4',
        name: 'random-bs',
        selected: true
      },
      {
        id: '5',
        name: 'react-redditjs'
      }
    ],
    modal: false
  }

  handleClose = () => {
    this.setState({ modal: false })
    console.log('closing modal')
  }

  handleConfirm = ({ name, about }) => {
    console.log({ name, about })
    this.setState({ modal: false })
    console.log('confimed modal')
  }

  openModal = () => {
    this.setState({ modal: true })
    console.log('opening modal')
  }

  render() {
    const { channels, modal } = this.state

    return (
      <ChannelsContainer>
        <AddChannelModal
          close={this.handleClose}
          confirm={this.handleConfirm}
          showing={modal}
        />
        <ChannelsHeading>
          <span>CHANNELS</span>
          <FaPlusSquare
            onClick={this.openModal}
            style={{ alignSelf: 'flex-end' }}
            size={20}
          />
        </ChannelsHeading>
        <ChannelsList>
          {channels.map(({ id, name, selected }) => (
            <ChannelItem key={id} selected={selected}>
              # {name}
            </ChannelItem>
          ))}
        </ChannelsList>
      </ChannelsContainer>
    )
  }
}

export default Channels
