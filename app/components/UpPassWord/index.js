/**
*
* UpPassWord
*
*/

import React from 'react';
import styled from 'styled-components';
import { Input,Button  } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import makeSelectUserPage from "../../containers/UserPage/selectors";
import {makeSelectCustomerNo, makeSelectUserId} from "../../containers/App/selectors";
import {getUserInfo, updatePassword} from "../../utils/service";
const md5Base64 = require('md5-base64');
import { signOutAction} from "../../containers/App/actions";

const PassWdiv = styled.div`
  width:500px;
  height:40px;
  margin:20px auto;
`;
const PassWitem = styled.div`
  margin-bottom:20px;
`;
const Title = styled.h3`
    font-size:20px;
   margin-bottom:30px;
   text-align:center;
`;
export class UpPassWord extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      oldPw:'',
      newPw:'',
      newPwC:""
    };
  }
  // componentDidMount(){
  //   this.checkPw();
  // }
  getOldP(pw){
    this.setState({oldPw:pw});
  }
  getNewP(pw){
    this.setState({newPw:pw});
  }
  getNewPw(pw){
    this.setState({newPwC:pw});
  }

  checkPassword(){
    let oldpassword=md5Base64(this.state.oldPw);
    if(this.state.newPw.length < 6){
      alert("新密码必须6位以上");
      return
    }
    let newPw = this.state.newPw;
    let newPwC = this.state.newPwC;
    if(newPw !== newPwC){
      alert("两次输入的密码不一致");
      return
    }
    newPw = md5Base64(newPw)
    updatePassword(oldpassword,newPw).then(data => {
      if (data.code !== 1)throw '旧密码错误';
        this.setState({
          oldPw:'',
          newPwC:'',
          newPw:''
        });
        alert("修改密码成功！");
      const {history,dispatch}=this.props;
      dispatch(signOutAction());
      history.replace('/login')
    }).catch(error => {alert(error)});

  }
  render() {
    return (
      <div>
        <PassWdiv>
          <Title>修改密码</Title>
          <PassWitem>
            <Input placeholder={'旧密码'} value={this.state.oldPw} onChange={e=>{this.getOldP(e.target.value)}}/>
          </PassWitem>
          <PassWitem>
            <Input placeholder={'新密码'} type="password" value={this.state.newPw} onChange={e=>{this.getNewP(e.target.value)}}/>
          </PassWitem>
          <PassWitem>
            <Input placeholder={'确认新密码'} type="password" value={this.state.newPwC} onChange={e=>{this.getNewPw(e.target.value)}}/>
          </PassWitem>
          <Button type="primary" onClick={e=>{this.checkPassword()}}>确认修改</Button>
          <br/>
        </PassWdiv>
      </div>
    );
  }
}


UpPassWord.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  userpage: makeSelectUserPage(),
  user_id:makeSelectUserId(),
  customer_no: makeSelectCustomerNo()
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps,mapDispatchToProps);

export default compose(
  withConnect,
)(UpPassWord);
