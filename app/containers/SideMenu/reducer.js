import * as _ from 'lodash';
import {
  LOAD_PODCAST_EPISODES,
  FETCH_PODCAST_EPISODES,
  SIDEMENU_SEARCH_TERM,
  SIDEMENU_SEARCH_RESULT,
} from './constants';

const initialState = { episodes: [] };

function returnSideMenuSearchResults(keyword, state) {
  var filteredEpisodes = [];
  state.episodes.forEach(function enterShow(show) {
    return filteredEpisodes.push(show.entries.filter(function filterEpisodes(episode) {
      return (episode.title.toLowerCase().indexOf(keyword) !== -1)
    }));
  });
  console.log('this is the filteredEpisode!: ', filteredEpisodes);
  return _.flattenDepth(filteredEpisodes, 2);
}

function sideMenuReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PODCAST_EPISODES:
      return { ...state };
    case LOAD_PODCAST_EPISODES:
      return { episodes: action.payload };
    case SIDEMENU_SEARCH_TERM:
      return { ...state,
        sideMenuSearchResult: returnSideMenuSearchResults(action.payload, state),
      };
    default:
      return state;
  }
}

export default sideMenuReducer;
