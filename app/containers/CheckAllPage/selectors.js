import { createSelector } from 'reselect';

/**
 * Direct selector to the checkAllPage state domain
 */
const selectCheckAllPageDomain = (state) => state.get('checkAllPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CheckAllPage
 */

const makeSelectCheckAllPage = () => createSelector(
  selectCheckAllPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectCheckAllPage;
export {
  selectCheckAllPageDomain,
};
