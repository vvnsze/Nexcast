import {
  SEARCH_PODCAST_TERM,
} from './constants';

export function searchTerm(payload) {
  return {
    type: SEARCH_PODCAST_TERM, payload,
  };
}
