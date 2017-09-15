/*
 *
 * Cards actions
 *
 */

import {
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
  EDIT_CARD,
  FALSIFY_EDITING_CARD,
} from './constants';

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
    type: FALSIFY_EDITING_CARD,
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
