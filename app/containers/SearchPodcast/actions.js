/*
 *
 * SearchPodcast actions
 *
 */

import {
  SEARCH_PODCAST_TERM,
  SELECTED_PODCAST,
  SET_VERIFICATION_TO_NULL,
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

export function nullifyVerified() {
  return {
    type: SET_VERIFICATION_TO_NULL,
  };
}
