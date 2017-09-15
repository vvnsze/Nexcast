/*
 *
 * SideMenu actions
 *
 */

import {
  FETCH_PODCAST_EPISODES,
  FETCH_EPISODE,
  SIDEMENU_SEARCH_TERM,
} from './constants';

export function loadPodcast() {
  return {
    type: FETCH_PODCAST_EPISODES,
    text: 'fetching podcast episodes',
  };
}

export function fetchEpisode(episode) {
  return {
    type: FETCH_EPISODE,
    payload: episode,
  };
}

export function fetchSideMenuResults(keyword) {
  return {
    type: SIDEMENU_SEARCH_TERM,
    payload: keyword,
  };
}
