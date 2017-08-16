/*
 *
 * EpisodePlayer actions
 *
 */

import {
  UPDATE_CARD_TIME,
} from './constants';

export function updateCardTime(time) {
  return {
    type: UPDATE_CARD_TIME,
    payload: time,
  };
}
