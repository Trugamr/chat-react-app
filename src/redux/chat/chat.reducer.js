import ChatActionTypes from './chat.types'

const INITIAL_STATE = {
  currentChannel: null,
  currentMessages: null,
  messageListeners: {},
  channelMessages: {},
  directMessages: {}
}

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload
      }
    default:
      return state
  }
}

export default chatReducer
