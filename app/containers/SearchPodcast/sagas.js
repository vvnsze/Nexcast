import { takeLatest, call, put } from 'redux-saga/effects';
import Axios from 'axios';
import {
  SEARCH_PODCAST_TERM,
  PODCAST_SEARCH_RESULTS,
} from './constants';

// Individual exports for testing
export function* initiatePodcastSearch() {
  yield takeLatest(SEARCH_PODCAST_TERM, podcastSearchAsync);
}

function* podcastSearchAsync(action) {
  try {
    const searchResults = yield call(searchPodcasts(action));
    yield put({ type: PODCAST_SEARCH_RESULTS, podcasts: searchResults });
  } catch (e) {
    console.error(e);
  }
}

function searchPodcasts(params) {
  return () => Axios.get(`https://itunes.apple.com/search?entity=podcast&term=${params}`);
}
// All sagas to be loaded
export default [
  initiatePodcastSearch,
];
