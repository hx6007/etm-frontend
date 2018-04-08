/**
 *
 * Asynchronously loads the component for DiningHallDetailPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
