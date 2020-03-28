import themes from './theme.data'

const INITIAL_STATE = {
  currentTheme: themes['light']
}

const themeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default themeReducer
