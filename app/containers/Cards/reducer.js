/*
 *
 * Cards reducer
 *
 */
import {
  DISPLAY_CARDS,
} from './constants';

const initialState = {};

function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_CARDS:
      return { allCards: action.payload.results };
    default:
      return state;
  }
}

export default cardsReducer;
