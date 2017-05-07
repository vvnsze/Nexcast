/*
 *
 * SearchPodcast actions
 *
 */

import {
  SEARCH_PODCAST_TERM,
  SELECTED_PODCAST,
} from './constants';

export function searchTerm(term) {
  return {
    type: SEARCH_PODCAST_TERM,
    payload: term,
  };
}

export function confirmPodcast(selectedPodcast) {
  return {
    type: SELECTED_PODCAST,
    payload: selectedPodcast,
  };
}
