import { createSelector } from 'reselect';

/**
 * Direct selector to the orderListPage state domain
 */
const selectOrderListPageDomain = (state) => state.get('orderListPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by OrderListPage
 */

const makeSelectOrderListPage = () => createSelector(
  selectOrderListPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectOrderListPage;
export {
  selectOrderListPageDomain,
};
