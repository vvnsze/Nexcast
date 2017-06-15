/*
 *
 * Cards reducer
 *
 */
import {
  DISPLAY_CARDS,
  SELECTED_EPISODE,
  CREATE_CARD,
  CARD_CREATED, 
  DELETE_CARD,
  CARD_DELETED,
  UPDATE_CARD,
  CARD_UPDATED, 
} from './constants';

const initialState = {};

function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_CARDS:
      return { ...state, allCards: action.payload.results };

    case SELECTED_EPISODE:
      return { ...state, selectedEpisode: action.payload };

    case CREATE_CARD:
      return { ...state };

    case CARD_CREATED:
      return { ...state, 
        cards: action.payload.response, 
        message: action.payload.message,
        success: action.payload.success,
      };

    case DELETE_CARD:
      return { ...state };

    case CARD_DELETED:
      return { ...state };

    case UPDATE_CARD:
      return { ...state };

    case CARD_UPDATED:
      return { ...state };
      
    default:
      return state;
  }
}

export default cardsReducer;
