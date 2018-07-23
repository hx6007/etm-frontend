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
const makeSelectUserName2 = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser','username2'])
);
const makeSelectLogSiteCode = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser','logSiteCode'])
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
const makeSelectCustomerGrade = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser','customer_grade'])
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
const makeFutures = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('Futures')
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
  makeFutures,
  makeSelectToken,
  makeSelectUserName2,
  makeSelectUserName,
  makeSelectLogSiteCode,
  makeSelectUserLevel,
  makeSelectUserType,
  makeSelectSiteCode,
  makeSelectCustomerGrade,
  makeSelectProductHalls,
  makeSelectWarehouse,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserIsValidate,
  makeSelectLocation,
};
