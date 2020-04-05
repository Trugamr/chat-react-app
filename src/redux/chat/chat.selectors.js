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

export const selectMessageSearchFilters = createSelector(
  [selectChat],
  chat => chat.messageSearchFilters
)

export const selectIsPrivateChannel = createSelector(
  [selectChat],
  chat => chat.isPrivateChannel
)

export const selectOtherUsersStatus = createSelector(
  [selectChat],
  chat => chat.otherUsersStatus
)
