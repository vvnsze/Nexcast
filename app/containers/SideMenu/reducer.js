import {
  LOAD_PODCAST_EPISODES,
  FETCH_PODCAST_EPISODES,
  SIDEMENU_SEARCH_TERM,
  SIDEMENU_SEARCH_RESULT,
} from './constants';

const initialState = { episodes: [] };

function returnSideMenuSearchResults(keyword, state) {
  var filteredEpisodes;
  filteredEpisodes = state.episodes.forEach(function enterShow(show) {
    return show.entries.filter(function filterEpisodes(episode) {
      if (episode.title.indexOf(keyword) !== -1) {
        return episode;
      }
    });
  });
  console.log('this is the filteredEpisode!: ', filteredEpisode);
  return filteredEpisodes;
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
