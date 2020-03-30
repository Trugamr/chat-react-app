import { combineReducers } from 'redux'

import themeReducer from './theme/theme.reducer'
import userReducer from './user/user.reducer'
import chatReducer from './chat/chat.reducer'

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  chat: chatReducer
})

export default rootReducer
