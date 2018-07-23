/**
 *
 * GoLogin
 *
 */

import React from 'react';
// import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import {SITE_CODE} from "../../utils/serverUrl.js"
import {compose} from "redux";
import {connect} from "react-redux";
import { createStructuredSelector } from 'reselect';
import {makeSelectUserLevel,makeSelectLocation} from "../../containers/App/selectors";


class GoLogin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const isUnLogin = this.props.userLevel === 0;
    const notlogin = ["/login","/apply"];
    const isNotLogin = notlogin.indexOf(this.props.routeinfo.pathname) === -1;
    if(isUnLogin && isNotLogin && (SITE_CODE === "ezz168" || SITE_CODE === "97ejk")){
      return <Redirect to="/login"/>
    }else if(this.props.routeinfo.pathname === "/" && (SITE_CODE === "ezz168" || SITE_CODE === "97ejk")){
      return <Redirect to="/productList?category=瓷砖" />
    }else if(!isUnLogin && !isNotLogin){
      return <Redirect to="/" />
    }else{
      return null
    }
  }
}

GoLogin.propTypes = {

};


const mapStateToProps = createStructuredSelector({
  userLevel: makeSelectUserLevel(),
  routeinfo: makeSelectLocation(),
});


const withConnect = connect(mapStateToProps);


export default compose(
  withConnect,
)(GoLogin);

