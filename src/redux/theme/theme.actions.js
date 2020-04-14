import ThemeActionTypes from './theme.types'

export const setTheme = themeName => ({
  type: ThemeActionTypes.SET_THEME,
  payload: themeName
})
