/**
 *
 * Asynchronously loads the component for JinXiaoCunSearchPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
