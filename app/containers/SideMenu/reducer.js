import {
  LOAD_PODCAST_EPISODES,
  FETCH_PODCAST_EPISODES,
} from './constants';

const initialState = { episodes: [] };

function sideMenuReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PODCAST_EPISODES:
      return { ...state };
    case LOAD_PODCAST_EPISODES:
      return { episodes: action.payload };
    default:
      return state;
  }
}

export default sideMenuReducer;
