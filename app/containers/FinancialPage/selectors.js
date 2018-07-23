import { createSelector } from 'reselect';

/**
 * Direct selector to the financialPage state domain
 */
const selectFinancialPageDomain = (state) => state.get('financialPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FinancialPage
 */

const makeSelectFinancialPage = () => createSelector(
  selectFinancialPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectFinancialPage;
export {
  selectFinancialPageDomain,
};
