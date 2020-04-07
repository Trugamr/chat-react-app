import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { FaPlusSquare } from 'react-icons/fa'

import AddChannelModal from '../add-channel-modal/add-channel-modal.component'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import {
  selectChannels,
  selectCurrentChannel,
  selectIsPrivateChannel
} from '../../redux/chat/chat.selectors'
import {
  setCurrentChannel,
  setPrivateChannel,
  setChannels
} from '../../redux/chat/chat.actions'

import Spinner from '../spinner/spinner.component'

import {
  ChannelsContainer,
  ChannelsHeading,
  ChannelsList,
  ChannelItem,
  Name,
  Notifications
} from './channels.styles'

import firebase, { firestore } from '../../firebase/firebase.utils'

class Channels extends React.Component {
  state = {
    channel: null,
    channelName: '',
    channelDetails: '',
    channelsRef: firestore.collection('channels'),
    unsubscribeChannelListener: null,
    notificationListeners: {},
    notifications: [],
    modal: false,
    firstLoad: true,
    activeChannel: null
  }

  componentDidMount() {
    this.addListeners()
  }

  componentDidUpdate() {
    const { channels } = this.props
    if (channels) this.setFirstChannel()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  addListeners = () => {
    const { channelsRef } = this.state
    const { setChannels } = this.props

    const unsubscribe = channelsRef
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const channels = snapshot.docs.map(doc => doc.data())
        setChannels(channels)

        // add notification listener for each channel
        channels.forEach(channel => this.addNotificationListener(channel.id))
      })

    this.setState({
      unsubscribeChannelListener: unsubscribe
    })
  }

  addNotificationListener = channelId => {
    const { channelsRef } = this.state

    const listener = channelsRef
      .doc(channelId)
      .collection('messages')
      .onSnapshot(snapshot => {
        if (this.state.channel) {
          this.handleNotifications(
            channelId,
            this.state.channel.id,
            this.state.notifications,
            snapshot
          )
        }
      })

    this.setState(({ notificationListeners }) => ({
      notificationListeners: { ...notificationListeners, [channelId]: listener }
    }))
  }

  handleNotifications = (
    channelId,
    currentChannelId,
    notifications,
    snapshot
  ) => {
    let lastTotal = 0

    const index = notifications.findIndex(
      notification => notification.id === channelId
    )

    if (index !== -1) {
      if (channelId !== currentChannelId) {
        lastTotal = notifications[index].lastKnownTotal

        if (snapshot.docs.length - lastTotal > 0) {
          notifications[index].count = snapshot.docs.length - lastTotal
          notifications[index].total = snapshot.docs.length
        }
      }
    } else {
      notifications.push({
        id: channelId,
        total: snapshot.docs.length,
        lastKnownTotal: snapshot.docs.length,
        count: 0
      })
    }

    this.setState({
      notifications
    })
  }

  removeListeners = () => {
    const { unsubscribeChannelListener } = this.state
    unsubscribeChannelListener()
    const { notificationListeners } = this.state
    Object.keys(notificationListeners).forEach(listener => {
      notificationListeners[listener]()
    })
  }

  setFirstChannel = () => {
    const { firstLoad } = this.state
    const { setCurrentChannel, channels } = this.props
    if (firstLoad && channels.length) {
      setCurrentChannel(channels[0])
      this.setActiveChannel(channels[0])
      this.setState({ firstLoad: false, channel: channels[0] })
    }
  }

  addChannel = ({ name, about }) => {
    const { channelsRef } = this.state
    const { currentUser } = this.props

    const ref = channelsRef.doc()

    const newChannel = {
      id: ref.id,
      name,
      details: about,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
        uid: currentUser.uid
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }

    channelsRef
      .doc(ref.id)
      .set(newChannel)
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
    const { setCurrentChannel, setPrivateChannel } = this.props
    setCurrentChannel(channel)
    setPrivateChannel(false)
    this.setActiveChannel(channel)
    this.setState({ channel }, () => this.clearNotifications())
  }

  clearNotifications = () => {
    let index = this.state.notifications.findIndex(
      notification => notification.id === this.state.channel.id
    )

    if (index !== -1) {
      let updatedNotifications = [...this.state.notifications]
      updatedNotifications[index].lastKnownTotal = this.state.notifications[
        index
      ].total
      updatedNotifications[index].count = 0
      this.setState({
        notifications: updatedNotifications
      })
    }
  }

  getNotificationCount = channel => {
    let count = 0
    this.state.notifications.forEach(notification => {
      if (notification.id === channel.id) {
        count = notification.count
      }
    })

    return count
  }

  render() {
    const { modal, firstLoad } = this.state
    const { isPrivateChannel, currentChannel, channels } = this.props

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
                  selected={
                    channel.id === currentChannel.id && !isPrivateChannel
                  }
                  onClick={() => this.changeChannel(channel)}
                >
                  <Name># {name}</Name>{' '}
                  {this.getNotificationCount(channel) ? (
                    <Notifications>
                      {this.getNotificationCount(channel)}
                    </Notifications>
                  ) : null}
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
  channels: selectChannels,
  currentChannel: selectCurrentChannel,
  isPrivateChannel: selectIsPrivateChannel
})

const mapDispatchToProps = dispatch => ({
  setChannels: channels => dispatch(setChannels(channels)),
  setCurrentChannel: channel => dispatch(setCurrentChannel(channel)),
  setPrivateChannel: isPrivate => dispatch(setPrivateChannel(isPrivate))
})

export default connect(mapStateToProps, mapDispatchToProps)(Channels)
