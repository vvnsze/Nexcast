/*
 *
 * EmailVerificationPodcastItem reducer
 *
 */
import {
  PENDING_PODCAST,
} from './constants';

const initialState = {};

function emailVerificationPodcastItemReducer(state = initialState, action) {
  switch (action.type) {
    case PENDING_PODCAST:
      return { ...state, pendingPodcast: action.pendingPodcast };
    default:
      return state;
  }
}

export default emailVerificationPodcastItemReducer;
