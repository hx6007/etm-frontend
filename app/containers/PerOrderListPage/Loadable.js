/**
 *
 * Asynchronously loads the component for PerOrderListPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
