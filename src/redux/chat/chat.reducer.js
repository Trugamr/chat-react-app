import ChatActionTypes from './chat.types'

const INITIAL_STATE = {
  currentChannel: null,
  channels: null,
  channelMembers: 0,
  messageSearchFilters: {
    text: ''
  },
  isPrivateChannel: false,
  otherUsersStatus: {},
  starredChannels: null,
  // for small screens
  sidebarShowing: false,
  metaShowing: false
}

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActionTypes.SET_CHANNELS:
      return {
        ...state,
        channels: action.payload
      }
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
    case ChatActionTypes.SET_STARRED_CHANNELS:
      return {
        ...state,
        starredChannels: action.payload
      }
    case ChatActionTypes.TOGGLE_SIDEBAR: {
      const toggled =
        action.payload !== undefined ? action.payload : !state.sidebarShowing
      return {
        ...state,
        sidebarShowing: toggled
      }
    }
    case ChatActionTypes.TOGGLE_META: {
      const toggled =
        action.payload !== undefined ? action.payload : !state.metaShowing
      return {
        ...state,
        metaShowing: toggled
      }
    }
    default:
      return state
  }
}

export default chatReducer
