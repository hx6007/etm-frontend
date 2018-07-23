/**
 *
 * Asynchronously loads the component for OrderListPage
 *
 */

import Loadable from 'react-loadable';
import React from "react";

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
