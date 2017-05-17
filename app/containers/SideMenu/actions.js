/*
 *
 * SideMenu actions
 *
 */

import {
  FETCH_PODCAST_EPISODES,
} from './constants';

export function loadPodcast() {
  return {
    type: FETCH_PODCAST_EPISODES,
    text: 'fetching podcast episodes',
  };
}
