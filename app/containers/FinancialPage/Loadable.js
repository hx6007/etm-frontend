/**
 *
 * Asynchronously loads the component for FinancialPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
