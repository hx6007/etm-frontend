import { createSelector } from 'reselect';

/**
 * Direct selector to the applyPage state domain
 */
const selectApplyPageDomain = (state) => state.get('applyPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ApplyPage
 */

const makeSelectApplyPage = () => createSelector(
  selectApplyPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectApplyPage;
export {
  selectApplyPageDomain,
};
