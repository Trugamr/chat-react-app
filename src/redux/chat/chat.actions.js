import ChatActionTypes from './chat.types'

export const setCurrentChannel = channel => ({
  type: ChatActionTypes.SET_CURRENT_CHANNEL,
  payload: channel
})
