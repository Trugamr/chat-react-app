import React from 'react'

import { FaStar, FaRegStar, FaSearch } from 'react-icons/fa'

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

const ChannelHeader = () => {
  const starred = true

  return (
    <ChannelHeaderContainer>
      <ChannelInfo>
        <Heading>
          <span># general</span>{' '}
          {starred ? <FaStar size={26} /> : <FaRegStar size={26} />}
        </Heading>
        <About>talk about anything here :)</About>
        <Members>2 members</Members>
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
    </ChannelHeaderContainer>
  )
}

export default ChannelHeader
