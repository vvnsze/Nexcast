import { createSelector } from 'reselect';

/**
 * Direct selector to the sideMenu state domain
 */
const selectSideMenuDomain = () => (state) => state.get('sideMenu');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SideMenu
 */

const makeSelectSideMenu = () => createSelector(
  selectSideMenuDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSideMenu;
export {
  selectSideMenuDomain,
};
