import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);
const makeSelectCategory = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('category')
);
const makeSelectNavbar = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('navbar')
);
const makeSelectUserId = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser','id'])
);
const makeSelectCustomerNo = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser','customer_no'])
);
const makeSelectToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser','ticket'])
);
const makeSelectUserName = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser','name'])
);
const makeSelectUserLevel = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser','level'])
);
const makeSelectUserType = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser','type'])
);
const makeSelectUserIsValidate = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser','is_validate'])
);
const makeSelectSiteCode = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('siteCode')
);
const makeSelectProductHalls = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('productHalls')
);
const makeSelectWarehouse = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('warehouse')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectUserId,
  makeSelectCategory,
  makeSelectNavbar,
  makeSelectCustomerNo,
  makeSelectToken,
  makeSelectUserName,
  makeSelectUserLevel,
  makeSelectUserType,
  makeSelectSiteCode,
  makeSelectProductHalls,
  makeSelectWarehouse,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserIsValidate,
  makeSelectLocation,
};
