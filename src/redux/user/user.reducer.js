import UserActionTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  isLoading: true,
  status: 'online'
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case UserActionTypes.CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false
      }
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false
      }
    case UserActionTypes.SET_USER_STATUS:
      return {
        ...state,
        status: action.payload
      }
    default:
      return state
  }
}

export default userReducer
