import { createSelector } from 'reselect';

/**
 * Direct selector to the productListPage state domain
 */
const selectProductListPageDomain = (state) => state.get('productListPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProductListPage
 */

const makeSelectProductListPage = () => createSelector(
  selectProductListPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectProductListPage;
export {
  selectProductListPageDomain,
};
