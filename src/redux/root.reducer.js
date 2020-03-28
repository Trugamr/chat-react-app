import { combineReducers } from 'redux'

import themeReducer from './theme/theme.reducer'
import userReducer from './user/user.reducer'

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer
})

export default rootReducer
