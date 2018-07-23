import { createSelector } from 'reselect';

/**
 * Direct selector to the crowdfundPage state domain
 */
const selectCrowdfundPageDomain = (state) => state.get('crowdfundPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CrowdfundPage
 */

const makeSelectCrowdfundPage = () => createSelector(
  selectCrowdfundPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectCrowdfundPage;
export {
  selectCrowdfundPageDomain,
};
