import { createSelector } from 'reselect';

/**
 * Direct selector to the perOrderDetailPage state domain
 */
const selectPerOrderDetailPageDomain = (state) => state.get('perOrderDetailPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PerOrderDetailPage
 */

const makeSelectPerOrderDetailPage = () => createSelector(
  selectPerOrderDetailPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectPerOrderDetailPage;
export {
  selectPerOrderDetailPageDomain,
};
