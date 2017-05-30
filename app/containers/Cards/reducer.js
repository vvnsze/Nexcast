/*
 *
 * Cards reducer
 *
 */
import {
  DISPLAY_CARDS,
  SELECTED_EPISODE,
} from './constants';

const initialState = {};

function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_CARDS:
      return { ...state, allCards: action.payload.results };
    case SELECTED_EPISODE:
      return { ...state, selectedEpisode: action.payload };
    default:
      return state;
  }
}

export default cardsReducer;
