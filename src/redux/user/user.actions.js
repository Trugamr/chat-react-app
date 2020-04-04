import UserActionTypes from './user.types'

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
})

export const setUserIsLoading = loading => ({
  type: UserActionTypes.SET_USER_IS_LOADING,
  payload: loading
})

export const clearCurrentUser = () => ({
  type: UserActionTypes.CLEAR_CURRENT_USER
})

export const setUserStatus = status => ({
  type: UserActionTypes.SET_USER_STATUS,
  payload: status
})
