import { createSelector } from 'reselect';

/**
 * Direct selector to the sonAccountPage state domain
 */
const selectSonAccountPageDomain = (state) => state.get('sonAccountPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SonAccountPage
 */

const makeSelectSonAccountPage = () => createSelector(
  selectSonAccountPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSonAccountPage;
export {
  selectSonAccountPageDomain,
};
