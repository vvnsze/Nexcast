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

import {
  UPDATE_CARD_TIME,
} from '../EpisodePlayer/constants';

const initialState = { cardTime: '00:00', cardDetail: {} };

function removeDeletedCard(deletedCardPayload, cardState) {
  var newState = cardState.allCards;
  if (deletedCardPayload.result.data.result === 1) {
    newState = cardState.allCards.filter(function remove(card) {
      if (card.id !== deletedCardPayload.cardId) {
        return card;
      }
    });
  }
  return newState;
}

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
        closeForm: true,
      };

    case UPDATE_CARD_TIME:
      return { ...state,
        cardTime: action.payload,
      };

    case DELETE_CARD:
      return { ...state };

    case CARD_DELETED:
      return { ...state, allCards: removeDeletedCard(action.payload, state) };

    case UPDATE_CARD:
      return { ...state, cardDetail: action.payload };

    case CARD_UPDATED:
      return { ...state };
    default:
      return state;
  }
}

export default cardsReducer;

// return cardState.allCards.filter(function remove(card) {
//   if (card.id !== deletedCardPayload.cardId) {
//     return card;
//   }
// });
