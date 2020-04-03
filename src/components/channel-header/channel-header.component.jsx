import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { FaStar, FaRegStar, FaSearch } from 'react-icons/fa'

import Spinner from '../spinner/spinner.component'

import {
  ChannelHeaderContainer,
  ChannelInfo,
  Heading,
  About,
  Members,
  SearchFieldContainer,
  Search,
  SearchInput
} from './channel-header.styles'

import { selectChannelMembers } from '../../redux/chat/chat.selectors'

const ChannelHeader = ({ currentChannel, members }) => {
  const starred = true

  return (
    <ChannelHeaderContainer>
      {currentChannel ? (
        <>
          <ChannelInfo>
            <Heading>
              <span># {currentChannel.name}</span>{' '}
              {starred ? <FaStar size={26} /> : <FaRegStar size={26} />}
            </Heading>
            <About>{currentChannel.details}</About>
            <Members>
              {members === 1 ? `${members} member` : `${members} members`}
            </Members>
          </ChannelInfo>
          <SearchFieldContainer>
            <Search>
              <SearchInput
                type="text"
                name="search"
                placeholder="search messages"
              />
              <FaSearch />
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

const mapStateToProps = createStructuredSelector({
  members: selectChannelMembers
})

export default connect(mapStateToProps)(ChannelHeader)
