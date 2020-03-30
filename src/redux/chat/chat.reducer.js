import ChatActiontypes from './chat.types'

const INITIAL_STATE = {
  currentChannel: {}
}

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActiontypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload
      }

    default:
      return state
  }
}

export default chatReducer
