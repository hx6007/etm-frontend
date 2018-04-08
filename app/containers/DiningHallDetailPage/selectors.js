import { createSelector } from 'reselect';

/**
 * Direct selector to the diningHallDetailPage state domain
 */
const selectDiningHallDetailPageDomain = (state) => state.get('diningHallDetailPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DiningHallDetailPage
 */

const makeSelectDiningHallDetailPage = () => createSelector(
  selectDiningHallDetailPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectDiningHallDetailPage;
export {
  selectDiningHallDetailPageDomain,
};
