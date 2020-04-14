import themes from './theme.data'

import ThemeActionTypes from './theme.types'

const INITIAL_STATE = {
  currentTheme: themes['light']
}

const themeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ThemeActionTypes.SET_THEME:
      return {
        ...state,
        currentTheme: themes[action.payload]
      }
    default:
      return state
  }
}

export default themeReducer
