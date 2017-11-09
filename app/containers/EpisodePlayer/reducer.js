/*
 *
 * EpisodePlayer reducer
 *
 */
import {
  PLAY_EPISODE,
} from './constants';

const initialState = { chosenEpisode: null };

function episodePlayerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_EPISODE:
      return { chosenEpisode: action.payload };
    default:
      return state;
  }
}

export default episodePlayerReducer;
