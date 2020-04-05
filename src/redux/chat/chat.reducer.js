import ChatActionTypes from './chat.types'

const INITIAL_STATE = {
  currentChannel: null,
  channelMembers: 0,
  messageSearchFilters: {
    text: ''
  },
  isPrivateChannel: false,
  otherUsersStatus: {}
}

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload
      }
    case ChatActionTypes.UPDATE_CHANNEL_MEMBERS:
      return {
        ...state,
        channelMembers: action.payload
      }
    case ChatActionTypes.SET_MESSAGE_SEARCH_FILTERS:
      return {
        ...state,
        messageSearchFilters: {
          ...state.messageSearchFilters,
          ...action.payload
        }
      }
    case ChatActionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.payload
      }
    case ChatActionTypes.SET_OTHER_USERS_STATUS:
      return {
        ...state,
        otherUsersStatus: action.payload
      }
    default:
      return state
  }
}

export default chatReducer
