import { takeLatest, all, call, select, put } from 'redux-saga/effects'

import ChatActionTypes from './chat.types'

import { getChannelsWithStarred } from './chat.utils'

import { selectChannels, selectCurrentChannel } from './chat.selectors'
import { setChannels, setCurrentChannel } from './chat.actions'

function* updateChannelsAfterStarred({ payload }) {
  const starred = payload
  const channels = yield select(selectChannels)
  const channelsWithStarred = getChannelsWithStarred(channels, starred)

  // update channels to have starred property
  yield put(setChannels(channelsWithStarred))
  // update current channel to have starred property
  let currentChannel = yield select(selectCurrentChannel)
  if (starred.includes(currentChannel.id)) {
    currentChannel = { ...currentChannel, starred: true }
  } else {
    currentChannel = { ...currentChannel, starred: false }
  }
  yield put(setCurrentChannel(currentChannel))
}

export function* onSetCurrentChannel() {
  yield takeLatest(
    ChatActionTypes.SET_STARRED_CHANNELS,
    updateChannelsAfterStarred
  )
}

export function* chatSagas() {
  yield all([call(onSetCurrentChannel)])
}
