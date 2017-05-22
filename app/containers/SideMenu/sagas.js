import { takeLatest, call, put } from 'redux-saga/effects';
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
  console.log('+++ line 32 initiating fetch podcast!');
  yield takeLatest(FETCH_EPISODE, fetchEpisodeAsync);
}

function* fetchEpisodeAsync(action) {
  console.log('+++line 37 running fetchEpisodeAsync: action.payload: ', action.payload);
  try {
    const episodeFile = yield call(retrievePodcastEpisode({ params: { episodeTitle: action.payload.episodeTitle, guid: action.payload.guid, description: action.payload.episodeFullContent, nexcastPodcastId: action.payload.nexcastPodcastId } }));
    yield put({ type: PLAY_EPISODE, payload: episodeFile });
  } catch (error) {
    console.error('+++line 36: there is an error in fetching episodes', error);
  }
}

function retrievePodcastEpisode(param) {
  console.log('+++line 47 axios call for episodes: ', param);
  return () => HttpClient.get('/api/episode', param);
}

export default [
  initiateFetchPodcast,
  initiateFetchEpisode,
];
