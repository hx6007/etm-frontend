/**
 *
 * Asynchronously loads the component for OrderSubmitPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
