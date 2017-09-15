/*
 *
 * Publish actions
 *
 */
import {
  PUBLISH_CARDS,
} from './constants';

export function publishCards(payload) {
  return {
    type: PUBLISH_CARDS,
    payload,
  };
}
