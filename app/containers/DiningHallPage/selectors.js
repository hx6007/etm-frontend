import { createSelector } from 'reselect';

/**
 * Direct selector to the diningHallPage state domain
 */
const selectDiningHallPageDomain = (state) => state.get('diningHallPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DiningHallPage
 */

const makeSelectDiningHallPage = () => createSelector(
  selectDiningHallPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectDiningHallPage;
export {
  selectDiningHallPageDomain,
};
