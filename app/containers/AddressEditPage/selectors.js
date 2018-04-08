import { createSelector } from 'reselect';

/**
 * Direct selector to the addressEditPage state domain
 */
const selectAddressEditPageDomain = (state) => state.get('addressEditPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AddressEditPage
 */

const makeSelectAddressEditPage = () => createSelector(
  selectAddressEditPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAddressEditPage;
export {
  selectAddressEditPageDomain,
};
