/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {SITE_CODE} from "../../utils/serverUrl.js";

import {
  LOAD_SUCCESS,
  LOAD_ERROR,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_TICKET,
  UPDATE_CATEGORY,
  UPDATE_NAVBAR, UPDATE_WAREHOUSE,
  UPDATE_FUTURES
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser:{
    id: null,//会员ID
    customer_no: null,//用户编号
    name: null,//名称
    type: null,//客户类型
    level: 0,//用户等级： 1 游客 2 注册会员 3 vip 4 白金
    is_validate: null,//非会员0, 会员为1,白金为2, 不传值为面价
    ticket: null,//客户登录后的token
    username2: null,//子账号用户名
    logSiteCode: null,//登录后的site_code
    customer_grade: null//客户类型
  },
  ticket:null,//访问权限
  siteCode: SITE_CODE,//所属平台ID
  productHalls: '20,40',//所属商品馆
  warehouse:'佛山仓',//仓库
  category:null,//分类 数组
  navbar:null,//导航条 数组 {id: "1", name: "瓷砖馆", link_url: "/products?search[product_category_id]=1", sort: "50"}
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SUCCESS:
      return state
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case UPDATE_TICKET:
      return state
        .set('ticket',action.ticket);
    case UPDATE_NAVBAR:
      return state
        .set('navbar',action.navbar);
    case UPDATE_CATEGORY:
      return state
        .set('category',action.category);
    case UPDATE_WAREHOUSE:
      return state
        .set('warehouse',action.warehouse);
    case UPDATE_FUTURES:
      return state
        .set('Futures',action.Futures);
    case SIGN_IN:
      return state
        .setIn(['currentUser','id'],action.userInfo.id)
        .setIn(['currentUser','customer_no'],action.userInfo.customer_no)
        .setIn(['currentUser','name'],action.userInfo.name)
        .setIn(['currentUser','level'],action.userInfo.level)
        .setIn(['currentUser','type'],action.userInfo.type)
        .setIn(['currentUser','is_validate'],action.userInfo.is_validate)
        .setIn(['currentUser','ticket'],action.userInfo.ticket)
        .setIn(['currentUser','username2'],action.userInfo.username2)
        .setIn(['currentUser','logSiteCode'],action.userInfo.logSiteCode)
        .setIn(['currentUser','customer_grade'],action.userInfo.customer_grade)
        .set('siteCode',action.siteCode)
        .set('productHalls',action.productHalls);
    case SIGN_OUT:
      return state
        .setIn(['currentUser','id'],null)
        .setIn(['currentUser','customer_no'],null)
        .setIn(['currentUser','name'],null)
        .setIn(['currentUser','type'],null)
        .setIn(['currentUser','level'],0)
        .setIn(['currentUser','is_validate'],null)
        .setIn(['currentUser','ticket'],null)
        .setIn(['currentUser','username2'],null)
        .setIn(['currentUser','logSiteCode'],null)
        .setIn(['currentUser','customer_grade'],null)
        .set('siteCode',SITE_CODE)
        .set('productHalls',SITE_CODE == "51etm" ? "20,40" : null)
        .set('ticket',null);
    default:
      return state;
  }
}

export default appReducer;
