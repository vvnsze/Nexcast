import { takeLatest, call, put } from 'redux-saga/effects';
import HttpClient from '../../httpClient';
import {
  SEARCH_PODCAST_TERM,
  PODCAST_SEARCH_RESULTS,
  SELECTED_PODCAST,
  PODCAST_EMAIL_VERIFICATION,
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
  const selectedPodcast = { trackId: action.payload.trackId, feedUrl: action.payload.feedUrl };
  try {
    const emailPodcastVerification = yield call(confirmPodcastEmail({ params: selectedPodcast }));
    console.log('server return results:', emailPodcastVerification.data);
    yield put({ type: PODCAST_EMAIL_VERIFICATION, verification: emailPodcastVerification.data });
  } catch (e) {
    console.error(e);
  }
}

function confirmPodcastEmail(params) {
  return () => HttpClient.get('/api/podcastverification', params);
}

// All sagas to be loaded
export default [
  initiatePodcastSearch,
  initiatePodcastConfirmation,
];
