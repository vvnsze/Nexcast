import { takeLatest, call, put } from 'redux-saga/effects';
import HttpClient from '../../httpClient';
import {
  SEARCH_PODCAST_TERM,
  PODCAST_SEARCH_RESULTS,
  SELECTED_PODCAST,
  CREATING_PODCAST_RECORD,
  PODCAST_VERIFICATION_START,
  PODCAST_VERIFICATION_COMPLETE,
} from './constants';

export function* initiatePodcastSearch() {
  yield takeLatest(SEARCH_PODCAST_TERM, podcastSearchAsync);
}

function* podcastSearchAsync(action) {
  const searchTerm = { term: action.payload.term };
  try {
    const searchResults = yield call(searchPodcasts({ params: searchTerm }));
    yield put({ type: PODCAST_SEARCH_RESULTS, podcasts: searchResults.data.podcasts });
  } catch (e) {
    console.error(e);
  }
}

function searchPodcasts(params) {
  return () => HttpClient.get('/api/itunes', params);
}

export function* initiatePodcastConfirmation() {
  yield takeLatest(SELECTED_PODCAST, confirmPodcastAsync);
}

function* confirmPodcastAsync(action) {
  try {
    yield put({ type: CREATING_PODCAST_RECORD });

    const result = yield call(createUserPodcast(action.payload));

    yield put({ type: PODCAST_VERIFICATION_START });

    const verifiedResult = yield call(verifyPodcast(action.payload));

    yield put({ type: PODCAST_VERIFICATION_START, payload: verifiedResult });
 
  } catch (e) {
    console.error(e);
  }
}

function verifyPodcast(body) {
  return () => HttpClient.post('/api/podcast/verify', body);
}

function createUserPodcast(body) {
  return () => HttpClient.post('/api/podcast', body);
}

// All sagas to be loaded
export default [
  initiatePodcastSearch,
  initiatePodcastConfirmation,
];
