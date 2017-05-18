import { takeLatest, take, call, put } from 'redux-saga/effects';
import HttpClient from '../../httpClient';

import {
  FETCH_PODCAST_EPISODES,
  LOAD_PODCAST_EPISODES,
  FETCH_EPISODE,
} from './constants';

import {
  PLAY_EPISODE,
} from '../EpisodePlayer/constants';

export function* initiateFetchPodcast() {
  yield take(FETCH_PODCAST_EPISODES, fetchPodcastAsync);
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

export function* initiateFetchEpisode() {
  yield takeLatest(FETCH_EPISODE, fetchEpisodeAsync);
}

function* fetchEpisodeAsync() {
  try {
    const episodeFile = yield call(retrievePodcastEpisode());
    yield put({ type: PLAY_EPISODE, payload: episodeFile });
  } catch (error) {
    console.error('+++line 36: there is an error in fetching episodes', error);
  }
}

function retrievePodcastEpisode(param) {
  return () => HttpClient.get('/api/episode', param);
}

// All sagas to be loaded
export default [
  initiateFetchPodcast,
  initiateFetchEpisode,
];
