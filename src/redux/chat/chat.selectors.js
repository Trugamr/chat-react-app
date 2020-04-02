import { createSelector } from 'reselect'

const selectChat = state => state.chat

export const selectCurrentChannel = createSelector(
  [selectChat],
  chat => chat.currentChannel
)

export const selectCurrentMessages = createSelector(
  [selectChat],
  chat => chat.currentMessages
)

export const selectMessageListeners = createSelector(
  [selectChat],
  chat => chat.messageListeners
)
