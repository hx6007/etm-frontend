/**
 *
 * Asynchronously loads the component for SonAccountEditPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
