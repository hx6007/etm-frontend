import { createSelector } from 'reselect';

/**
 * Direct selector to the perOrderListPage state domain
 */
const selectPerOrderListPageDomain = (state) => state.get('perOrderListPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PerOrderListPage
 */

const makeSelectPerOrderListPage = () => createSelector(
  selectPerOrderListPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectPerOrderListPage;
export {
  selectPerOrderListPageDomain,
};
