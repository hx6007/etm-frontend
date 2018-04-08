/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {Link} from 'react-router-dom';
import HtmlTitle from '../../components/HtmlTitle/index';
import GetPlatform from "../../components/GetPlatform";
import loginBg from '../../images/login/login_bg.jpg';
import styled from 'styled-components';
import LoginForm from "../../components/LoginForm/index";
import {signInAction, updateTicket} from '../App/actions'
import {makeSelectUserId} from "../App/selectors";
import {SITE_CODE} from "../../utils/serverUrl.js";


const Body = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
   `;
const Header = styled.div`
      width: 80%;
      margin: auto auto;
      padding: 20px 0px;
   `;
const Logo = styled.img`
     width: 146px;
     height: 80px;
  `;
const IndexLink = styled(Link)`
      text-decoration: none;
      font-size: 16px;
      color: #bbb;
      border:1px solid #bbb;
      -webkit-border-radius:5px;
      -moz-border-radius:5px;
      border-radius:5px;
      cursor: pointer;      
      margin-left: 30px;
      padding:10px 24px;
      &:hover,&:focus,&:active{
        color: #a59f9f;
        border:1px solid #a59f9f;
      }
  `;
const Section = styled.div`
      display: flex;
      justify-content: center;
      width: 100%;
      height: 630px;
      background: url(${loginBg}) no-repeat;
      background-size: auto;
      -webkit-background-size: auto;
      -moz-background-size: auto;
      -o-background-size: auto;
      overflow: hidden;
  `;
const MainBox = styled.div`
      display: flex;
      justify-content: flex-end;
      width: 80%;
      height: 430px;
      margin:40px auto 30px;
      align-items: center;
  `;
const FormBox = styled.div`
      flex-direction: row-reverse;
      width: 350px;
      //height: 450px;
      padding:20px 25px 40px;
      background: #ffffff;
      box-shadow:0 0 20px rgba(48,48,48,0.2);
      z-index: 20;
  `;
const Footer = styled.div`
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 14px;
      font-weight: bold;
      color: #666666;
      text-align: center;
      margin-top: 30px;
  `;

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillReceiveProps(nextProps){
    if(nextProps.userId){
      nextProps.history.goBack();
    }
  }

  render() {
    const platform = GetPlatform();
    return (
      <div>
        <HtmlTitle title={platform.name + " - 登录"}/>
        <Body>
          <view>
            <Header>
              <Logo src={platform.logo} alt={platform.name}></Logo>
              {SITE_CODE !== "97ejk" && <IndexLink to='/'>返回首页</IndexLink>}
            </Header>
          </view>
          <Section>
            <MainBox>
              <FormBox>
                <LoginForm onReceiveUserInfo={this.props.onReceiveUserInfo} onReceiveTicket={this.props.onReceiveTicket}/>
              </FormBox>
            </MainBox>
          </Section>
          <Footer>
            COPYRIGHT © 2013-2017 {platform.company} 版权所有 {platform.recordation}
          </Footer>
        </Body>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
  userId:makeSelectUserId(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onReceiveUserInfo:(userInfo,siteCode,productHalls)=>dispatch(signInAction(userInfo,siteCode,productHalls)),
    onReceiveTicket:(ticket)=>dispatch(updateTicket(ticket))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'loginPage', reducer});
const withSaga = injectSaga({key: 'loginPage', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
  )(LoginPage);
