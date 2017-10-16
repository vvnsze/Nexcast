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
  FALSIFY_EDITING_CARD,
} from './constants';

import {
  UPDATE_CARD_TIME,
} from '../EpisodePlayer/constants';

import {
  CARDS_PUBLISHED,
  DISPLAY_CARDS_PUBLISHED,
  DISPLAY_PUBLISHING_CARDS,
} from '../Publish/constants';

const initialState = { cardTime: '00:00', cardDetail: {}, editingCard: false, displaySavedMessage: false };

function removeDeletedCard(deletedCardPayload, cardState) {
  var newState = cardState.allCards;
  if (deletedCardPayload.result.data.result === 1) {
    newState = cardState.allCards.filter(function remove(card) {
      if (card.id !== deletedCardPayload.cardId) {
        return card;
      }
    });
  }
  return addTags(newState);
}

function updateSingleCard(updatePayload, cardState) {
  var newState = cardState.allCards;
  if (updatePayload.result.data.success === true) {
    newState = cardState.allCards.map(function updateSet(card) {
      if (card.id === updatePayload.updatedCard.id) {
        return updatePayload.updatedCard;
      }
      return card;
    });
  }
  return addTags(newState);
}

function addCreatedCard(createPayload, cardState) {
  var newState = cardState.allCards;

  if (createPayload.result.data.success === true) {
    if (newState.length === 0) {
      newState = [];
    }
    newState.push(createPayload.createdCard);
  }
  return addTags(newState);
}

function addTags(cardState) {
  if (cardState.length === 0) {
    return;
  }
  var newState = [];
  cardState.forEach(function hmsToSeconds(card) {
    let seconds;
    if (!card.taggedTimestamp) {
      return;
    }
    const timeString = card.taggedTimestamp.split(':');
    if (timeString.length === 3) {
      seconds = (+timeString[0]) * 3600 + (+timeString[1]) * 60 + (+timeString[2]);
      card.seconds = seconds;
      newState.push(card);
    } else {
      seconds = ((+timeString[0]) * 60) + (+timeString[1]);
      card.seconds = seconds;
      newState.push(card);
    }
  });
  return newState;
}

function changeCardsToPublished(cardState) {
  console.log('this is card state in cards published: ', cardState);
  const newState = cardState.allCards.map(function changeToPublished(card) {
    const newCard = card;
    newCard.is_published = true;
    return newCard;
  });
  return newState;
}

function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_CARDS:
      return { ...state, allCards: addTags(action.payload.results) };

    case SELECTED_EPISODE:
      return { ...state, selectedEpisode: action.payload };

    case CREATE_CARD:
      return { ...state };

    case CARD_CREATED:
      return { ...state,
        cards: action.payload.response,
        message: action.payload.message,
        success: action.payload.success,
        showForm: false,
        allCards: addCreatedCard(action.payload, state),
        displaySavedMessage: false,
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
        showForm: true,
        editingCard: true,
      };

    case TOGGLE_EDITING_CARD:
      return { ...state,
        editingCard: true,
      };

    case FALSIFY_EDITING_CARD:
      return { ...state,
        editingCard: false,
      };

    case UPDATE_CARD:
      return { ...state };

    case CARD_UPDATED:
      return { ...state,
        showForm: false,
        editingCard: false,
        allCards: updateSingleCard(action.payload, state),
      };
    case CARDS_PUBLISHED:
      return { ...state,
        allCards: changeCardsToPublished(state),
        displaySavedMessage: true,
      };
    default:
      return state;
  }
}

export default cardsReducer;
