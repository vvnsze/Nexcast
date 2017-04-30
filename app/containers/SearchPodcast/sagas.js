import { takeLatest, call, put } from 'redux-saga/effects';
import Axios from 'axios';
import {
  SEARCH_PODCAST_TERM,
  PODCAST_SEARCH_RESULTS,
} from './constants';

export function* initiatePodcastSearch() {
  yield takeLatest(SEARCH_PODCAST_TERM, podcastSearchAsync);
}

function* podcastSearchAsync(action) {
  console.log('+++inside saga action payload: ', action.payload);
  const searchTerm = { term: action.payload.term };
  try {
    const searchResults = yield call(searchPodcasts({ params: searchTerm }));
    console.log('searchResults', searchResults.data.podcasts);
    yield put({ type: PODCAST_SEARCH_RESULTS, podcasts: searchResults.data.podcasts });
  } catch (e) {
    console.error(e);
  }
}

function searchPodcasts(params) {
  return () => Axios.get('/itunes', params);
}
// All sagas to be loaded
export default [
  initiatePodcastSearch,
];
