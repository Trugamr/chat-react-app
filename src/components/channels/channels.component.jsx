import React from 'react'

import { FaPlusSquare } from 'react-icons/fa'

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
        name: 'ui-designt'
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
    ]
  }

  render() {
    const { channels } = this.state

    return (
      <ChannelsContainer>
        <ChannelsHeading>
          <span>CHANNELS</span>
          <FaPlusSquare style={{ alignSelf: 'flex-end' }} size={20} />
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
