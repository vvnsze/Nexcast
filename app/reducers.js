/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import currentUserReducer from './containers/Authorization/currentUserReducer';
import searchPodcastReducer from './containers/SearchPodcast/reducer';
import signInReducer from './containers/SignIn/reducer';
import cardsReducer from './containers/Cards/reducer';
import episodePlayerReducer from './containers/EpisodePlayer/reducer';

/*
 * routeReducer
 *
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = {
  locationBeforeTransitions: null,
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return { ...state, locationBeforeTransitions: action.payload };
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    currentUser: currentUserReducer,
    podcasts: searchPodcastReducer,
    signIn: signInReducer,
    cards: cardsReducer,
    episodePlayer: episodePlayerReducer,
    ...asyncReducers,
  });
}
