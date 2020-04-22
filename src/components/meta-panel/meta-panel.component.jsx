import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import moment from 'moment'

import {
  selectCurrentChannel,
  selectChannelMembers,
  selectIsPrivateChannel,
  selectMetaShowing
} from '../../redux/chat/chat.selectors'

import { toggleMeta } from '../../redux/chat/chat.actions'

import {
  MetaPanelContainer,
  Meta,
  About,
  CreatedBy,
  CreatedOn,
  ActiveMembers,
  Member,
  Info,
  CloseMeta
} from './meta-panel.styles'

import { FaArrowRight } from 'react-icons/fa'

const formatTime = timestamp =>
  moment(timestamp.toDate()).format('Do MMM, YYYY')

const MetaPanel = ({
  currentChannel,
  channelMembers,
  isPrivateChannel,
  metaShowing,
  toggleMeta
}) => {
  return (
    <MetaPanelContainer metaShowing={metaShowing}>
      <CloseMeta onClick={() => toggleMeta(false)}>
        <FaArrowRight />
        <span>CLOSE</span>
      </CloseMeta>
      <Meta>
        {currentChannel && !isPrivateChannel ? (
          <>
            <About>
              <h2>About #{currentChannel.name}</h2>
              <p>{currentChannel.details}</p>
            </About>
            <CreatedBy>
              <h2>created by</h2>
              <span>@{currentChannel.createdBy.name}</span>
            </CreatedBy>
            <CreatedOn>
              <h2>created on</h2>
              <span>{formatTime(currentChannel.createdAt)}</span>
            </CreatedOn>
          </>
        ) : null}

        {channelMembers &&
        !isPrivateChannel &&
        channelMembers.members.length ? (
          <ActiveMembers>
            <h2>Active Members</h2>
            {channelMembers.members.map(
              ({ name, avatar, messagesCount }, index) => (
                <Member key={index}>
                  <img src={avatar} alt="avatar" />
                  <Info>
                    <h2>{name}</h2>
                    <span>
                      {messagesCount}{' '}
                      {messagesCount > 1 ? 'messages' : 'message'}{' '}
                    </span>
                  </Info>
                </Member>
              )
            )}
          </ActiveMembers>
        ) : null}
      </Meta>
    </MetaPanelContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  currentChannel: selectCurrentChannel,
  channelMembers: selectChannelMembers,
  isPrivateChannel: selectIsPrivateChannel,
  metaShowing: selectMetaShowing
})

const mapDispatchToProps = dispatch => ({
  toggleMeta: boolean => dispatch(toggleMeta(boolean))
})

export default connect(mapStateToProps, mapDispatchToProps)(MetaPanel)
