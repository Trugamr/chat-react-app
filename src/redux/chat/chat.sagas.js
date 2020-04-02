import { takeLatest, all, call } from 'redux-saga/effects'

import ChatActionTypes from './chat.types'

function* demo() {
  yield console.log('CHANNEL_CHANGED')
}

export function* onSetCurrentChannel() {
  yield takeLatest(ChatActionTypes.SET_CURRENT_CHANNEL, demo)
}

export function* chatSagas() {
  yield all([call(onSetCurrentChannel)])
}
