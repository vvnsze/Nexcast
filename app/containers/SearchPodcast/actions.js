/*
 *
 * SearchPodcast actions
 *
 */

import {
  PODCAST_SEARCH_RESULTS,
  SEARCH_PODCAST_TERM,
} from './constants';

export function searchTerm(term) {
  return {
    type: SEARCH_PODCAST_TERM,
    payload: term,
  };
}
