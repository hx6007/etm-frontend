/**
 *
 * Asynchronously loads the component for SonAccountPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
