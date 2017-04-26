/*
 *
 * SearchPodcast actions
 *
 */

import {
  PODCAST_SEARCH_RESULTS,
} from './constants';

export function searchTerm() {
  return {
    type: PODCAST_SEARCH_RESULTS,
  };
}
