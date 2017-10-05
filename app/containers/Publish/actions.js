/*
 *
 * Publish actions
 *
 */
import {
  PUBLISH_CARD,
} from './constants';

export function publishCard(payload) {
  return {
    type: PUBLISH_CARD,
    payload,
  };
}
