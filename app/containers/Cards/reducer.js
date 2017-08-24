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
  EDIT_CARD,
  UPDATE_CARD,
  CARD_UPDATED,
  TOGGLE_EDITING_CARD,
} from './constants';

import {
  UPDATE_CARD_TIME,
} from '../EpisodePlayer/constants';

const initialState = { cardTime: '00:00', cardDetail: {}, editingCard: false };

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

function updateSingleCard(updatePayload, cardState) {
  var newState = cardState.allCards;
  console.log('this is the updatedPayload!', updatePayload);
  if (updatePayload.result.data.success === true) {
    newState = cardState.allCards.map(function updateSet(card) {
      if (card.id !== updatePayload.updatedCard.id) {
        return card;
      }
      if (card.id === updatePayload.updatedCard.id) {
        return updatePayload.updatedCard;
      }
    });
  }
  return newState;
}

function addCreatedCard(createPayload, cardState) {
  var newState = cardState.allCards;
  if (createPayload.result.data.success === true) {
    newState.push(createPayload.createdCard);
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
        allCards: addCreatedCard(action.payload, state),
      };

    case UPDATE_CARD_TIME:
      return { ...state,
        cardTime: action.payload,
      };

    case DELETE_CARD:
      return { ...state };

    case CARD_DELETED:
      return { ...state,
        allCards: removeDeletedCard(action.payload, state),
      };

    case EDIT_CARD:
      return { ...state,
        cardDetail: action.payload,
        closeForm: false,
        editingCard: true,
      };

    case TOGGLE_EDITING_CARD:
      return { ...state,
        editingCard: true,
      };

    case UPDATE_CARD:
      return { ...state };

    case CARD_UPDATED:
      return { ...state,
        closeForm: true,
        editingCard: false,
        allCards: updateSingleCard(action.payload, state),
      };
    default:
      return state;
  }
}

export default cardsReducer;
