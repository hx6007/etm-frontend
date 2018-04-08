/**
 *
 * MyLink
 *
 */

import React from 'react';
import HeaderLink from './HeaderLink';

// import styled from 'styled-components';

/**
 * 快速跳转链接
 * @returns {XML}
 * @constructor
 */
function MyLink() {
  return (
    <div>
      <HeaderLink to="/">首页</HeaderLink>
      <HeaderLink to="/productList">产品列表</HeaderLink>
      <HeaderLink to="/products">产品详情</HeaderLink>
      <HeaderLink to="/login">登录</HeaderLink>
      <HeaderLink to="/apply" >客户加盟</HeaderLink>
      <HeaderLink to="/cart" >购物车</HeaderLink>
      <HeaderLink to="/user" >会员中心</HeaderLink>
      <HeaderLink to="/addressList" >收货地址列表</HeaderLink>
      <HeaderLink to="/addressEdit" >收货地址编辑</HeaderLink>
    </div>
  );
}

MyLink.propTypes = {};

export default MyLink;
