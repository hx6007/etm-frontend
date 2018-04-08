/**
*
* GetPlatform
*
*/

import React from 'react';
// import styled from 'styled-components';
import {SITE_CODE} from "../../utils/serverUrl.js"
import imgLogo from "images/login/etm_logo.png";
import ImgLogoejk from "images/login/ejk_logo.png";
import ImgLogoexc from "images/login/exc-logo.png";
import ImgLogokiki from "images/login/kiki-logo.png";
import ImgLogoefx from "images/login/efx-logo.png";
import ImgLogoezz from "images/login/ezz-logo.png";
import ImgLogololatc from "images/login/lolatc-logo.png";
import ImgLogomqd from "images/login/mqd-logo.png";
import ImgLogolike_peach from "images/login/like_peach-logo.png";
import imgCode from 'images/menu/service_code.jpg'
import imgCodeExc from 'images/menu/service_exc.jpg'
import imgCodemqd from 'images/menu/mqd-qrcode.png'
import munuCode from 'images/menu/code.jpg';
import rbanner from 'images/register/banner2.jpg';
import rbannerExc from 'images/register/banner_exc.jpg';
import rbannerEjk from 'images/register/banner_ejk.jpg';
import rbannerEzz from 'images/register/banner_ezz.jpg';
import rbannerEfx from 'images/register/banner_efx.png';

function GetPlatform() {
  const baidutj = function(code){
    return "var _hmt = _hmt || [];"
        +"(function() {"
        +"var hm = document.createElement('script');"
        +"hm.src = 'https://hm.baidu.com/hm.js?"+code+"';"
        +"var s = document.getElementsByTagName('script')[0];"
        +"s.parentNode.insertBefore(hm, s);"
        +"})()";
  }
  const loginUrls = {
      "51exc": {
        "name":"e选材",
        "adindex": "9",
        "title":" - 一家居建材厂家直供装修公司平台",
        "server_tel":"0757-82260043",
        "connect_tel":"0757-82260043",
        "server_email":"1300274203@qq.com",
        "company":"佛山市楼兰家居用品有限公司",
        "recordation":"粤ICP备12034873号-8",
        "logo":ImgLogoexc,
        "service_code": imgCodeExc,
        "regist_banner":rbannerExc,
        "menu_code":"",
        "baidutj":baidutj('ccb80538c0442629c9c7ccdb395c2279'),
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      },
      "51etm": {
        "name":"e特卖",
        "adindex": "7",
        "title":" - 一家专门做瓷砖特卖的网站",
        "server_tel":"0757-82260043",
        "connect_tel":"0757-82260043",
        "server_email":"1300274203@qq.com",
        "company":"海南合易信息科技有限公司",
        "recordation":"琼ICP备17001457号",
        "logo":imgLogo,
        "service_code": imgCode,
        "regist_banner":rbanner,
        "menu_code":munuCode,
        "baidutj":baidutj('6136989d982173c5ad63c7a1f153ad71'),
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      },
      "97ejk": {
        "name":"e进口",
        "adindex": "31",
        "title":" - 精选国外优质品牌",
        "server_tel":"13925485873",
        "connect_tel":"15015842740",
        "server_email":"813009500@qq.com",
        "company":"佛山市方圆陶瓷有限公司",
        "recordation":"粤ICP备12001574号-2",
        "logo": ImgLogoejk,
        "service_code": "",
        "regist_banner":rbannerEjk,
        "menu_code":"",
        "baidutj":baidutj('8d091748dd0e8c81581548048042ae9b'),
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      },
      "kiki": {
        "name":"KIKI",
        "adindex": "10",
        "title":" - 一家专门做瓷砖的网站",
        "server_tel":"13925485873",
        "connect_tel":"15015842740",
        "server_email":"813009500@qq.com",
        "company":"佛山市方圆陶瓷有限公司",
        "recordation":"粤ICP备12001574号-2",
        "logo": ImgLogokiki,
        "service_code": "",
        "menu_code":"",
        "baidutj":baidutj('9111d5f9658298af8b8c2653b1a90cb5'),
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      },
      "51ecg": {
        "name":"51采购",
        "adindex": "10",
        "title":" - 一家专门做瓷砖的网站",
        "server_tel":"13925485873",
        "connect_tel":"15015842740",
        "server_email":"813009500@qq.com",
        "company":"佛山市方圆陶瓷有限公司",
        "recordation":"粤ICP备12001574号-2",
        "logo": ImgLogokiki,
        "service_code": "",
        "menu_code":"",
        "baidutj":"",
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      },
      "97efx": {
        "name":"97efx",
        "adindex": "9",
        "title":" - 一家专门做瓷砖的网站",
        "server_tel":"13925485873",
        "connect_tel":"15015842740",
        "server_email":"813009500@qq.com",
        "company":"佛山市方圆陶瓷有限公司",
        "recordation":"粤ICP备12001574号-2",
        "logo": ImgLogoefx,
        "service_code": "",
        "regist_banner":rbannerEfx,
        "menu_code":"",
        "baidutj":"",
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      },
      "ezz168": {
        "name":"ezz168",
        "adindex": "12",
        "title":" - 一家专门做瓷砖的网站",
        "server_tel":"13925485873",
        "connect_tel":"15015842740",
        "server_email":"813009500@qq.com",
        "company":"佛山市方圆陶瓷有限公司",
        "recordation":"粤ICP备12001574号-2",
        "logo": ImgLogoezz,
        "service_code": "",
        "regist_banner":rbannerEzz,
        "menu_code":"",
        "baidutj":"",
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      },
      "168ezc": {
        "name":"168ezc",
        "adindex": "9",
        "title":" - 一家专门做瓷砖的网站",
        "server_tel":"13925485873",
        "connect_tel":"15015842740",
        "server_email":"813009500@qq.com",
        "company":"佛山市方圆陶瓷有限公司",
        "recordation":"粤ICP备12001574号-2",
        "logo": ImgLogoezz,
        "service_code": "",
        "menu_code":"",
        "baidutj":"",
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      },
      "maqiduo": {
        "name":"maqiduo",
        "adindex": "11",
        "title":" - 一家专门做瓷砖的网站",
        "server_tel":"13925485873",
        "connect_tel":"15015842740",
        "server_email":"813009500@qq.com",
        "company":"佛山市方圆陶瓷有限公司",
        "recordation":"粤ICP备12001574号-2",
        "logo": ImgLogomqd,
        "service_code": imgCodemqd,
        "menu_code":"",
        "baidutj":baidutj('011ab84acc8cdcc6d8ee9546cd7aa6b5'),
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      },
      "lola_ceramics": {
        "name":"楼兰陶瓷",
        "adindex": "11",
        "title":" - 一家专门做瓷砖的网站",
        "server_tel":"13925485873",
        "connect_tel":"15015842740",
        "server_email":"813009500@qq.com",
        "company":"佛山市方圆陶瓷有限公司",
        "recordation":"粤ICP备12001574号-2",
        "logo": ImgLogololatc,
        "service_code": "",
        "menu_code":"",
        "baidutj":baidutj('9571060cd49b9ad898fc593f509643c3'),
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      },
      "like_peach": {
        "name":"like_peach",
        "adindex": "11",
        "title":" - 一家专门做瓷砖的网站",
        "server_tel":"13925485873",
        "connect_tel":"15015842740",
        "server_email":"813009500@qq.com",
        "company":"佛山市方圆陶瓷有限公司",
        "recordation":"粤ICP备12001574号-2",
        "logo": ImgLogolike_peach,
        "service_code": "",
        "menu_code":"",
        "baidutj":baidutj('20c13d0c75d4cf18f2d9d1fbefbba201'),
        "address":"广东省佛山市禅城区华宝南路13号佛山国家火炬创新创业园D栋2-6楼"
      }
    };
    if(loginUrls[SITE_CODE]){
      return loginUrls[SITE_CODE]
    }else{
      alert("当前网站未配置")
    }
}

GetPlatform.propTypes = {

};

export default GetPlatform;
