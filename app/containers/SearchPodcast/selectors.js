import { createSelector } from 'reselect';

/**
 * Direct selector to the searchPodcast state domain
 */
const selectSearchPodcastDomain = () => (state) => state.get('searchPodcast');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchPodcast
 */

const makeSelectSearchPodcast = () => createSelector(
  selectSearchPodcastDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSearchPodcast;
export {
  selectSearchPodcastDomain,
};
