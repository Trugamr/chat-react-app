import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { FaPlusSquare } from 'react-icons/fa'

import AddChannelModal from '../add-channel-modal/add-channel-modal.component'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCurrentChannel } from '../../redux/chat/chat.selectors'
import { setCurrentChannel } from '../../redux/chat/chat.actions'

import Spinner from '../spinner/spinner.component'

import {
  ChannelsContainer,
  ChannelsHeading,
  ChannelsList,
  ChannelItem
} from './channels.styles'

import { database } from '../../firebase/firebase.utils'

class Channels extends React.Component {
  state = {
    channels: [],
    channelName: '',
    channelDetails: '',
    channelsRef: database.ref('channels'),
    modal: false,
    firstLoad: true,
    activeChannel: null
  }

  componentDidMount() {
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  addListeners = () => {
    const { channelsRef } = this.state
    let loadedChannels = []
    channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val())
      this.setState({ channels: loadedChannels }, this.setFirstChannel)
    })
  }

  removeListeners = () => {
    const { channelsRef } = this.state
    channelsRef.off()
  }

  setFirstChannel = () => {
    const { firstLoad, channels } = this.state
    const { setCurrentChannel } = this.props
    if (firstLoad && channels.length) {
      setCurrentChannel(channels[0])
      this.setActiveChannel(channels[0])
      this.setState({ firstLoad: false })
    }
  }

  addChannel = ({ name, about }) => {
    const { channelsRef } = this.state
    const { currentUser } = this.props

    const key = channelsRef.push().key

    const newChannel = {
      id: key,
      name,
      details: about,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
        uid: currentUser.uid
      }
    }

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: '', channelDetails: '', modal: false })
        console.log('channel created')
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleClose = () => {
    this.setState({ modal: false })
  }

  handleConfirm = ({ name, about }) => {
    this.setState({ channelName: name, channelDetails: about })
    if (name && about) {
      this.addChannel({ name, about })
    }
  }

  openModal = () => {
    this.setState({ modal: true })
  }

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id })
  }

  changeChannel = channel => {
    const { setCurrentChannel } = this.props
    setCurrentChannel(channel)
    this.setActiveChannel(channel)
  }

  render() {
    const { channels, modal, activeChannel, firstLoad } = this.state

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
        {firstLoad ? (
          <Spinner
            style={{ backgroundColor: 'transparent', marginTop: 20 }}
            size="40px"
          />
        ) : (
          <ChannelsList>
            {channels.map(channel => {
              const { id, name } = channel
              return (
                <ChannelItem
                  key={id}
                  selected={channel.id === activeChannel}
                  onClick={() => this.changeChannel(channel)}
                >
                  # {name}
                </ChannelItem>
              )
            })}
          </ChannelsList>
        )}
      </ChannelsContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel
})

const mapDispatchToProps = dispatch => ({
  setCurrentChannel: channel => dispatch(setCurrentChannel(channel))
})

export default connect(mapStateToProps, mapDispatchToProps)(Channels)
