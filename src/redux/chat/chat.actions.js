import ChatActionTypes from './chat.types'

export const setChannels = channels => ({
  type: ChatActionTypes.SET_CHANNELS,
  payload: channels
})

export const setCurrentChannel = channel => ({
  type: ChatActionTypes.SET_CURRENT_CHANNEL,
  payload: channel
})

export const updateChannelMembers = members => ({
  type: ChatActionTypes.UPDATE_CHANNEL_MEMBERS,
  payload: members
})

export const setMessageSearchFilters = filters => ({
  type: ChatActionTypes.SET_MESSAGE_SEARCH_FILTERS,
  payload: filters
})

export const setPrivateChannel = isPrivate => ({
  type: ChatActionTypes.SET_PRIVATE_CHANNEL,
  payload: isPrivate
})

export const setOtherUsersStatus = otherUsersStatus => ({
  type: ChatActionTypes.SET_OTHER_USERS_STATUS,
  payload: otherUsersStatus
})

export const setStarredChannels = starredChannels => ({
  type: ChatActionTypes.SET_STARRED_CHANNELS,
  payload: starredChannels
})
