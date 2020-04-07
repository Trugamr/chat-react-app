import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { FaStar } from 'react-icons/fa'

import {
  setCurrentChannel,
  setPrivateChannel
} from '../../redux/chat/chat.actions'

import {
  selectChannels,
  selectCurrentChannel,
  selectIsPrivateChannel
} from '../../redux/chat/chat.selectors'

import {
  StarredContainer,
  StarredHeading,
  StarredList,
  StarredItem,
  PlaceholderText
} from './starred.styles'

class Starred extends React.Component {
  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id })
  }

  changeChannel = channel => {
    const { setCurrentChannel, setPrivateChannel } = this.props
    setCurrentChannel(channel)
    setPrivateChannel(false)
    this.setActiveChannel(channel)
  }

  getStarredChannels = () => {
    const { channels } = this.props

    if (this.props.channels) {
      return channels.filter(channel => channel.starred)
    } else {
      return []
    }
  }

  render() {
    const { setCurrentChannel, currentChannel, isPrivateChannel } = this.props

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
        {this.getStarredChannels().length ? null : (
          <PlaceholderText key="placeholder-text">
            Your favourite channels will show up here.
          </PlaceholderText>
        )}
        <StarredList>
          {this.getStarredChannels().map(channel => {
            const { id, name } = channel
            return (
              <StarredItem
                key={id}
                onClick={() => setCurrentChannel(channel)}
                selected={!isPrivateChannel && channel.id === currentChannel.id}
              >
                # {name}
              </StarredItem>
            )
          })}
        </StarredList>
      </StarredContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  channels: selectChannels,
  currentChannel: selectCurrentChannel,
  isPrivateChannel: selectIsPrivateChannel
})

const mapDispatchToProps = dispatch => ({
  setCurrentChannel: channel => dispatch(setCurrentChannel(channel)),
  setPrivateChannel: isPrivate => dispatch(setPrivateChannel(isPrivate))
})

export default connect(mapStateToProps, mapDispatchToProps)(Starred)
