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
    position: fixed;
    top:30px;
    display: flex;
    align-items: flex-end;
    margin-left: 10%;
   `;
const Logo = styled.img`
     width: 146px;
     height: 80px;
  `;
const Section = styled.div`
      background-image: url(${loginBg});
      height: 90vh;
      background-size:cover;
  `;
const FormBox = styled.div`
      width: 350px;
      position: fixed;
      transform:translateY(-70%);
      top: 50%;
      right: 20%;
      border-radius: 5px;
      //height: 450px;
      background: #ffffff;
      box-shadow:0 0 20px rgba(48,48,48,0.2);
  `;
const Footer = styled.div`
      width: 100%;
      height: 10vh;
      display: flex;
      align-items: center;
      justify-content: center;      
      font-size: 14px;
      font-weight: bold;
      color: #666666;
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
            <Header>
              {SITE_CODE === "97ejk" ? <Logo src={platform.logo} alt={platform.name} /> : <Link to="/"><Logo src={platform.logo} alt={platform.name} /></Link> }
            </Header>
          <Section>
              <FormBox>
                <LoginForm onReceiveUserInfo={this.props.onReceiveUserInfo} onReceiveTicket={this.props.onReceiveTicket}/>
              </FormBox>
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
