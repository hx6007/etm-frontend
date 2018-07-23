/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DiningHallPage from 'containers/DiningHallPage';
import DiningHallDetailPagePage from 'containers/DiningHallDetailPage';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import ApplyPage from 'containers/ApplyPage/Loadable';
import UserPage from 'containers/UserPage/Loadable';
import CartPage from 'containers/CartPage/Loadable';
import ProductListPage from 'containers/ProductListPage/Loadable';
import ProductDetailPage from 'containers/ProductDetailPage/Loadable';
import AddressListPage from 'containers/AddressListPage/Loadable';
import OrderSubmitPage from 'containers/OrderSubmitPage/Loadable';
import AddressEditPage from 'containers/AddressEditPage';
import GoLogin from '../../components/GoLogin/index';


export default function App() {
  return (
    <div>
      <GoLogin />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/topic/:topicId" component={HomePage} />
        <Route path="/productList" component={ProductListPage} />
        <Route path="/clearProductList" component={ProductListPage} />
        <Route path="/products/:productId" component={ProductDetailPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/apply" component={ApplyPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/orderSubmit" component={OrderSubmitPage} />
        <Route path="/user" component={UserPage} />
        <Route path="/addressList" component={AddressListPage} />
        <Route path="/addressEdit" component={AddressEditPage} />
        <Route path="/diningHall" component={DiningHallPage} />
        <Route path="/diningHallList/:List" component={DiningHallPage} />
        <Route path="/diningHallDetail/:DocCode" component={DiningHallDetailPagePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
