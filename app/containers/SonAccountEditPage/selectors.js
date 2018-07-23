import { createSelector } from 'reselect';

/**
 * Direct selector to the sonAccountEditPage state domain
 */
const selectSonAccountEditPageDomain = (state) => state.get('sonAccountEditPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SonAccountEditPage
 */

const makeSelectSonAccountEditPage = () => createSelector(
  selectSonAccountEditPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSonAccountEditPage;
export {
  selectSonAccountEditPageDomain,
};
