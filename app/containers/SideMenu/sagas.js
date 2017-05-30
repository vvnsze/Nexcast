import { takeLatest, call, put } from 'redux-saga/effects';
import HttpClient from '../../httpClient';

import {
  FETCH_PODCAST_EPISODES,
  LOAD_PODCAST_EPISODES,
  FETCH_EPISODE,
} from './constants';

import {
  DISPLAY_CARDS,
  SELECTED_EPISODE,
} from '../Cards/constants';

import {
  PLAY_EPISODE,
} from '../EpisodePlayer/constants';

export function* initiateFetchPodcast() {
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

export function* initiateFetchEpisode() {
  yield takeLatest(FETCH_EPISODE, fetchEpisodeAsync);
}

function* fetchEpisodeAsync(action) {
  try {
    const results = yield call(retrievePodcastEpisode({ params: { episodeTitle: action.payload.episodeTitle, guid: action.payload.guid, description: action.payload.episodeFullContent, nexcastPodcastId: action.payload.nexcastPodcastId } }));
    yield put({ type: PLAY_EPISODE, payload: action.payload.episodeFile });
    yield put({ type: SELECTED_EPISODE, payload: action.payload.episodeTitle });
    yield put({ type: DISPLAY_CARDS, payload: results.data });
  } catch (error) {
    console.error('+++line 36: there is an error in fetching episodes', error);
  }
}

function retrievePodcastEpisode(param) {
  return () => HttpClient.get('/api/episode', param);
}

export default [
  initiateFetchPodcast,
  initiateFetchEpisode,
];
