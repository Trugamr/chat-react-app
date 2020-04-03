import ChatActionTypes from './chat.types'

export const setCurrentChannel = channel => ({
  type: ChatActionTypes.SET_CURRENT_CHANNEL,
  payload: channel
})

export const updateChannelMembers = members => ({
  type: ChatActionTypes.UPDATE_CHANNEL_MEMBERS,
  payload: members
})
