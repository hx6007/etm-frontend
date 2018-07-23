/**
 *
 * Asynchronously loads the component for CheckAllPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
