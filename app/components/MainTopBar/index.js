/**
 *
 * MainTopBar
 *
 */

import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {createStructuredSelector} from "reselect";
import GetPlatform from "../../components/GetPlatform";
import { makeSelectUserName, makeSelectUserId,makeSelectUserLevel,makeSelectToken } from 'containers/App/selectors';
import { signOutAction} from "../../containers/App/actions";
import {logout} from "../../utils/service";
import {SITE_CODE} from "../../utils/serverUrl.js"
import {makeSelectUserName2} from "../../containers/App/selectors";



const BarBackground = styled.div`
  display: block;
  background: rgb(229,229,229);
  justify-content: center;
`;

const BarContainer = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  color: #999;
  font-size: 15px;
  width: 1200px;
  `;
const BarLink = styled(Link)`
  text-decoration: none;
  padding: 8px 15px;
  color: #999;
  &:hover,&:focus,&:active{
    color: #c52242;
  }
`;
const TopBarSpan = styled.span`
  text-decoration: none;
  padding: 8px 15px;
  color: #999;
  &:hover,&:focus,&:active{
    color: #c52242;
  }
`;

const BarLinkRed = styled(BarLink)`
  color:#c52242;
`;
const Exit = styled.span`
  cursor: pointer;
`;
const Code = styled.img`
  position: absolute;
  right: 0;
  top: 38px;
`;
const Contact = styled.div`
  position: absolute;
  right: 0;
  background: white;
  top: 38px;
  padding: 12px 15px;
`;
const Space=styled.div`
  flex: 1;
`;


class MainTopBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = {
      shouldShowCode: false,//显示二维码
      shouldShowContact: false,//显示客服电话
    }
  }
  changeVisibility(which,shouldShow) {
    this.setState({
      [which]: shouldShow
    })
  }

  getLogout(){
    logout().then(data =>{
      if(data.code !== 1) {
        if(data.code === 8){
          this.props.signOut()
        }
        this.props.signOut()
        alert("退出成功！")
      }else{
        this.props.signOut()
      }
    }).catch(error => {console.log(error)})
  }


  getLoginTag(username){
   return <div>
     {this.props.username2 !==null && this.props.username2 ? <BarLinkRed to='/user' target="_blank">{username}-{this.props.username2}</BarLinkRed>
     :<BarLinkRed to='/user' target="_blank">{username}</BarLinkRed>
     }
     &nbsp;&nbsp;
     <Exit onClick={e=>{this.getLogout()}}>退出</Exit>
     &nbsp;&nbsp;&nbsp;&nbsp;
   </div>
  }

  render() {
   const platform = GetPlatform();
    const {username,userId,userLevel}=this.props;
    return (
      <BarBackground>
        {(SITE_CODE === "like_peach"||SITE_CODE === "kiki"||SITE_CODE === "maqiduo"||SITE_CODE === "lola_ceramics") ?
          "":
          <BarContainer>
            您好，欢迎来到{platform.name}平台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {userId ? this.getLoginTag(username) : (
              <div><BarLinkRed to='/login'>请登录</BarLinkRed>|<BarLink to='/apply' target="_blank">企业入驻</BarLink></div>)}
            <Space/>
            <BarLinkRed to='/cart' target="_blank">购物车</BarLinkRed>|
            <BarLink to='/user' target="_blank">个人中心</BarLink>|
            <TopBarSpan onMouseEnter={e => this.changeVisibility('shouldShowContact', true)}
                     onMouseLeave={e => this.changeVisibility('shouldShowContact', false)}>客服中心</TopBarSpan>|
            <TopBarSpan onMouseEnter={e => this.changeVisibility('shouldShowCode', true)}
                     onMouseLeave={e => this.changeVisibility('shouldShowCode', false)}>手机{platform.name}</TopBarSpan>
            {this.state.shouldShowCode && platform.menu_code && <Code src={platform.menu_code}/>}
            {this.state.shouldShowContact &&
            <Contact>
              客服热线：{platform.server_tel}<br/>招商热线：{platform.connect_tel}<br/>客服邮箱：{platform.server_email}
            </Contact>}
          </BarContainer>
        }
      </BarBackground>
    );
  }
}

MainTopBar.propTypes = {};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUserName(),
  userId: makeSelectUserId(),
  userLevel: makeSelectUserLevel(),
  ticket: makeSelectToken(),
  username2: makeSelectUserName2()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signOut:()=>dispatch(signOutAction())
  };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);


export default compose(
  withConnect,
)(MainTopBar);

