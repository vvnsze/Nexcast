
import {
  PODCAST_SEARCH_RESULTS,
} from './constants';

const initialState = {};

function searchPodcastReducer(state = initialState, action) {
  switch (action.type) {
    case PODCAST_SEARCH_RESULTS:
      return ({ podcast: action });
    default:
      return state;
  }
}

export default searchPodcastReducer;
