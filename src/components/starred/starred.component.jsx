import React from 'react'

import { FaStar } from 'react-icons/fa'

import {
  StarredContainer,
  StarredHeading,
  StarredList,
  StarredItem
} from './starred.styles'

class Channels extends React.Component {
  state = {
    channels: [
      {
        id: 1,
        name: 'general',
        selected: true
      },
      {
        id: 2,
        name: 'memes'
      }
    ]
  }

  render() {
    const { channels } = this.state

    return (
      <StarredContainer>
        <StarredHeading>
          <span>STARRED</span>
          <FaStar
            onClick={this.openModal}
            style={{ alignSelf: 'flex-end' }}
            size={20}
          />
        </StarredHeading>
        <StarredList>
          {channels.map(channel => {
            const { id, name } = channel
            return (
              <StarredItem key={id} selected={channel.selected}>
                # {name}
              </StarredItem>
            )
          })}
        </StarredList>
      </StarredContainer>
    )
  }
}

export default Channels
