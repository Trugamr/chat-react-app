import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { FaStar, FaRegStar, FaSearch, FaTimes } from 'react-icons/fa'

import Spinner from '../spinner/spinner.component'

import {
  ChannelHeaderContainer,
  ChannelInfo,
  Heading,
  About,
  Members,
  SearchFieldContainer,
  Search,
  SearchInput,
  UserStatus,
  Dot,
  Status
} from './channel-header.styles'

import {
  selectChannelMembers,
  selectIsPrivateChannel,
  selectOtherUsersStatus
} from '../../redux/chat/chat.selectors'

import {
  setMessageSearchFilters,
  setStarredChannels
} from '../../redux/chat/chat.actions'

import { firestore } from '../../firebase/firebase.utils'

class ChannelHeader extends React.Component {
  state = {
    filters: {
      text: ''
    },
    status: 'offline',
    usersRef: firestore.collection('users')
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState(
      {
        filters: {
          [name]: value
        }
      },
      () => {
        this.setFilters(this.state.filters)
      }
    )
  }

  unsubscribeStarredListener = null

  componentDidMount() {
    const { usersRef } = this.state
    const { currentUser, setStarredChannels } = this.props

    this.unsubscribeStarredListener = usersRef
      .doc(currentUser.uid)
      .onSnapshot(snapshot => {
        const starred = snapshot.data()['starred']
        setStarredChannels(starred)
      })
  }

  componentWillUnmount() {
    this.unsubscribeStarredListener()
  }

  setFilters = filters => {
    const { setMessageSearchFilters } = this.props

    setMessageSearchFilters(filters)
  }

  clearText = () => {
    this.setState(
      {
        filters: {
          text: ''
        }
      },
      () => {
        this.setFilters(this.state.filters)
      }
    )
  }

  getStatusForDM = () => {
    const { otherUsersStatus, currentChannel } = this.props
    if (currentChannel && currentChannel['uid']) {
      return otherUsersStatus[currentChannel['uid']]
    } else {
      return 'offline'
    }
  }

  handleStar = starred => {
    this.starChannel(starred)
  }

  starChannel = () => {
    const { usersRef } = this.state
    const { currentUser, currentChannel } = this.props

    let starredChannels = []

    // check if starred property exists on user first
    usersRef
      .doc(currentUser.uid)
      .get()
      .then(snapshot => {
        const data = snapshot.data()
        if (data['starred']) {
          starredChannels = [...data['starred']]
        } else {
          starredChannels = []
        }

        // check if channel already starred
        const index = starredChannels.indexOf(currentChannel.id)
        if (index === -1) {
          starredChannels.push(currentChannel.id)
        } else {
          starredChannels.splice(index, 1)
        }

        // push new starred channels array to firebase
        usersRef
          .doc(currentUser.uid)
          .update({
            starred: starredChannels
          })
          .then(() => console.log('starred channels updated'))
          .catch(err => console.error(err))
      })
  }

  render() {
    const { currentChannel, members, privateChannel } = this.props
    const { filters } = this.state

    // status for direct message user
    const status = this.getStatusForDM()

    return (
      <ChannelHeaderContainer>
        {currentChannel ? (
          <>
            <ChannelInfo>
              <Heading>
                <span>
                  {privateChannel ? '@' : '#'} {currentChannel.name}
                </span>{' '}
                {!privateChannel ? (
                  currentChannel.starred ? (
                    <FaStar size={26} onClick={() => this.handleStar()} />
                  ) : (
                    <FaRegStar size={26} onClick={() => this.handleStar()} />
                  )
                ) : null}
              </Heading>
              {!privateChannel ? (
                <About>{currentChannel.details}</About>
              ) : (
                <UserStatus>
                  <Dot status={status} /> <Status>{status}</Status>
                </UserStatus>
              )}
              {!privateChannel ? (
                <Members>
                  {members === 1 ? `${members} member` : `${members} members`}
                </Members>
              ) : null}
            </ChannelInfo>
            <SearchFieldContainer>
              <Search>
                <SearchInput
                  type="text"
                  name="text"
                  onChange={this.handleChange}
                  value={filters.text}
                  placeholder="search messages"
                />
                {filters.text.length ? (
                  <FaTimes onClick={this.clearText} />
                ) : (
                  <FaSearch />
                )}
              </Search>
            </SearchFieldContainer>
          </>
        ) : (
          <Spinner
            style={{ backgroundColor: 'transparent', gridColumn: '1 / span 2' }}
          />
        )}
      </ChannelHeaderContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  members: selectChannelMembers,
  privateChannel: selectIsPrivateChannel,
  otherUsersStatus: selectOtherUsersStatus
})

const mapDispatchToProps = dispatch => ({
  setMessageSearchFilters: filters =>
    dispatch(setMessageSearchFilters(filters)),
  setStarredChannels: starredChannels =>
    dispatch(setStarredChannels(starredChannels))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelHeader)
