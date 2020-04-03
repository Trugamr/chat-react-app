import { createSelector } from 'reselect'

const selectChat = state => state.chat

export const selectCurrentChannel = createSelector(
  [selectChat],
  chat => chat.currentChannel
)

export const selectChannelMembers = createSelector(
  [selectChat],
  chat => chat.channelMembers
)
