/**
 *
 * Asynchronously loads the component for SonAccount
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
