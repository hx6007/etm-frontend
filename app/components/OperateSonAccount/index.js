/**
*
* OperateSonAccount
*
*/

import React from 'react';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import connect from "react-redux/es/connect/connect";
import compose from "redux/es/compose";
import {makeSelectSiteCode, makeSelectUserName} from "../../containers/App/selectors";
import {addSonAccount, updateSonAccount} from "../../utils/service";
const md5Base64 = require('md5-base64');

const PerDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Label = styled.label`
  color: #666;
  font-size: 16px;
  padding-top: 20px;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid #ccc;
  width: 300px;
  margin-left: 15px;
  height: 35px;
  text-indent: 0.7em;
  font-size: 15px;
`;
const readonlyInput = styled.input`
  outline: none;
  border: 1px solid #ccc;
  width: 300px;
  margin-left: 15px;
  height: 35px;
  text-indent: 0.7em;
  font-size: 15px;
  background: #cccccc;
`;
const SpanTitle = styled.span`
  font-size: 15px;
`;
const SpanP = styled.span`
  padding-left: 15px;
`;
const SpanP2 = styled.span`
  padding-left: 30px;
`;
const ButDiv = styled.div`
  padding-top: 20px;
`;
const SureButton = styled.button`
  font-size: 15px;
  background-color: #0F0F0F;
  color: #fff;
  border: solid #BDBDBD 1px;
  height: 40px;
  width: 100px;
`;
const ResetButton = styled(SureButton)`
  background-color: #fff;
  color: #383A3D;
  margin-left: 10px;
`;
const ErrorTips = styled.span`
    height: 12px;
    color: #e72b06;
    font-size: 16px;
    font-weight: normal;
  `;




class OperateSonAccount extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    if(props.sonEdit === undefined){
      this.state = {
        sonAccountName: "",
        remark: "",
        sonPassword: "",
        sonAccountNameError: "",
        remarkError: "",
        sonPasswordError: "",
        status: "add",
      }
    }else{
      this.state = {
        sonAccountName: props.sonEdit[0].username2,
        remark: props.sonEdit[0].memo,
        sonPassword: props.sonEdit[0].password,
        sonAccountNameError: "",
        remarkError: "",
        sonPasswordError: "",
        status: "update"
      }
    }
    console.log("修改子账号",props.sonEdit === undefined)
  }

  /**
   * 监听表单中的数据，保存到state中
   */
  onInput(key,value){
    this.setState({
      [key]:value
    })
  }

  handleClick(event){
    let result;
    if(!this.state.sonAccountName){
      result = false;
      this.setState({
        sonAccountNameError: "子账号名称不能为空"
      })
    }else if(!this.state.remark){
      result = false;
      this.setState({
        remarkError: "备注不能为空"
      })
    }else if(!this.state.sonPassword) {
      result = false;
      this.setState({
        sonPasswordError: "密码不能为空"
      })
    }else{
      result = true;
    }
    if(result) {
      if(this.state.status === "update"){
        updateSonAccount(this.state.sonAccountName,md5Base64(this.state.sonPassword)).then(data => {
          if(data.code === 1){
            alert("修改密码成功")
            this.props.history.push('/user/sonAccount');
          }
        })

      }else{
        let sonParams = {
          username: this.props.username,
          username2: this.state.sonAccountName,
          password: md5Base64(this.state.sonPassword),
          memo: this.state.remark,
          logSiteCode: this.props.logSiteCode
        }
        addSonAccount(sonParams).then(data => {
        if(data.code == 1){
          alert("注册成功")
          this.setState({
            sonAccountName: "",
            sonPassword: "",
            remark: ""
          })
        }else {
          alert(data.message);
        }
      }).catch(error=>{
        console.log(error);
      })
      }

    }
  }

  render() {
    return (
      <PerDetail>
        <SpanTitle>新增/修改子账号</SpanTitle>
        {this.state.status ==="add" ?
          <Label>
            <SpanP>子账号：</SpanP>
            <Input placeholder="请输入账号名称..." value={this.state.sonAccountName} onChange={(e)=>this.onInput('sonAccountName', e.target.value)}/>
          </Label>
          :
          <Label>
            <SpanP>子账号：</SpanP>
            <Input style={{cursor: 'not-allowed'}} disabled placeholder="请输入账号名称..." value={this.state.sonAccountName} onChange={(e)=>this.onInput('sonAccountName', e.target.value)}/>
          </Label>
        }
        <ErrorTips>{this.state.sonAccountNameError}</ErrorTips>
        {this.state.status ==="add" ?
          <Label>
            <SpanP2>备注：</SpanP2>
            <Input placeholder="请输入备注信息，如真实姓名..." value={this.state.remark} onChange={(e) => this.onInput('remark', e.target.value)} />
          </Label>
          :
          <Label>
            <SpanP2>备注：</SpanP2>
            <Input style={{cursor: 'not-allowed'}} disabled placeholder="请输入备注信息，如真实姓名..." value={this.state.remark} onChange={(e) => this.onInput('remark', e.target.value)} />
          </Label>
        }
        <ErrorTips>{this.state.remarkError}</ErrorTips>
        <Label>设置密码：<Input placeholder="请输入子账号初始密码..." type="password" value={this.state.sonPassword} onChange={(e) => this.onInput('sonPassword', e.target.value)}/></Label>
        <ErrorTips>{this.state.sonPasswordError}</ErrorTips>
        <ButDiv>
          <SureButton onClick={(event) => this.handleClick()}>保存</SureButton>
        </ButDiv>
      </PerDetail>
    );
  }
}

OperateSonAccount.propTypes = {

};

const mapStateToProps = createStructuredSelector ({
  siteCode: makeSelectSiteCode(),
  username: makeSelectUserName(),
  logSiteCode: makeSelectSiteCode(),
});
const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(OperateSonAccount);

