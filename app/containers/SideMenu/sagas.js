import { takeLatest, call, put } from 'redux-saga/effects';
import HttpClient from '../../httpClient';

import {
  FETCH_PODCAST_EPISODES,
  LOAD_PODCAST_EPISODES,
} from './constants';

export function* initiateFetchPodcast() {
  console.log('inside initiateFetchPodcast. beginning saga');
  yield takeLatest(FETCH_PODCAST_EPISODES, fetchPodcastAsync);
}

function* fetchPodcastAsync() {
  try {
    const result = yield call(loadPodcastEpisodes());
    yield put({ type: LOAD_PODCAST_EPISODES, payload: result.data.result });
  } catch (e) {
    console.error('+++line 17 this is the error!:', e);
  }
}

function loadPodcastEpisodes() {
  return () => HttpClient.get('/api/podcast');
}

// All sagas to be loaded
export default [
  initiateFetchPodcast,
];
