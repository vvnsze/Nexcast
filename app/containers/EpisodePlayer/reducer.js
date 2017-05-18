/*
 *
 * EpisodePlayer reducer
 *
 */
import {
  PLAY_EPISODE,
} from './constants';

const initialState = {};

function episodePlayerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_EPISODE:
      return state;
    default:
      return state;
  }
}

export default episodePlayerReducer;
