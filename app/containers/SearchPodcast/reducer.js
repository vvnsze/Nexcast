
import {
  PODCAST_SEARCH_RESULTS,
  PODCAST_EMAIL_VERIFICATION,
} from './constants';

const initialState = {};

function searchPodcastReducer(state = initialState, action) {
  switch (action.type) {
    case PODCAST_SEARCH_RESULTS:
      return ({ podcast: action });
    case PODCAST_EMAIL_VERIFICATION:
      return ({ verification: action });
    default:
      return state;
  }
}

export default searchPodcastReducer;
