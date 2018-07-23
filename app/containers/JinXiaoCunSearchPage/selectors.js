import { createSelector } from 'reselect';

/**
 * Direct selector to the jinXiaoCunSearchPage state domain
 */
const selectJinXiaoCunSearchPageDomain = (state) => state.get('jinXiaoCunSearchPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by JinXiaoCunSearchPage
 */

const makeSelectJinXiaoCunSearchPage = () => createSelector(
  selectJinXiaoCunSearchPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectJinXiaoCunSearchPage;
export {
  selectJinXiaoCunSearchPageDomain,
};
