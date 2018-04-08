import { createSelector } from 'reselect';

/**
 * Direct selector to the productDetailPage state domain
 */
const selectProductDetailPageDomain = (state) => state.get('productDetailPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProductDetailPage
 */

const makeSelectProductDetailPage = () => createSelector(
  selectProductDetailPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectProductDetailPage;
export {
  selectProductDetailPageDomain,
};
