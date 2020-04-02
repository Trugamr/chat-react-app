import { all, call } from 'redux-saga/effects'

import { chatSagas } from './chat/chat.sagas'

export default function* rootSaga() {
  yield all([call(chatSagas)])
}
