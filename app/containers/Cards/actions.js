/*
 *
 * Cards actions
 *
 */

import {
  // DISPLAY_CARDS,
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
  EDIT_CARD,
  TOGGLE_EDITING_CARD,
} from './constants';

// export function displayCards(payload) {
//   return {
//     type: DISPLAY_CARDS,
//     payload,
//   };
// }

export function createCard(payload) {
  return {
    type: CREATE_CARD,
    payload,
  };
}

export function editCard(payload) {
  return {
    type: EDIT_CARD,
    payload,
  };
}

export function resetEditingCard() {
  return {
    type: TOGGLE_EDITING_CARD,
  };
}

export function updateCard(payload) {
  return {
    type: UPDATE_CARD,
    payload,
  };
}

export function deleteCard(payload) {
  return {
    type: DELETE_CARD,
    payload,
  };
}
