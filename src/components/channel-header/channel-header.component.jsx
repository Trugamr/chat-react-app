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
import { setMessageSearchFilters } from '../../redux/chat/chat.actions'

class ChannelHeader extends React.Component {
  state = {
    starred: true,
    filters: {
      text: ''
    },
    status: 'offline'
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

  render() {
    const { currentChannel, members, privateChannel } = this.props
    const { starred, filters } = this.state

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
                  starred ? (
                    <FaStar size={26} />
                  ) : (
                    <FaRegStar size={26} />
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
  setMessageSearchFilters: filters => dispatch(setMessageSearchFilters(filters))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelHeader)
