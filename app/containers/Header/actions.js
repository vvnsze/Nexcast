import {
  SEARCH_PODCAST_TERM,
  LOG_USER_OUT
} from './constants';

export function searchTerm(payload) {
  return {
    type: SEARCH_PODCAST_TERM,
    payload,
  };
}

export function logOutUser() {
  return {
    type: LOG_USER_OUT,
  };
}
