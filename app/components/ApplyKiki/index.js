/**
*
* ApplyKiki
*
*/

import React from 'react';
import styled from 'styled-components';
import kikiBgRe from 'images/register/kikiRegister.jpg';
import icPhone from 'images/login/phone.png';
import icPasd from 'images/login/pasd.png';
import reMessage from 'images/register/message.png';
import {sendVerify} from "../../utils/service";

const ReForm = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const FormTitle = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  `;

const TextView = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
  margin-top: 30px;
  `;
const LoginTitle = styled.span`
  padding:5px 10px;
  font-size: 22px;
  font-weight: bold;
  color: #00B098;
  border-bottom: 3px solid #00B098;
  cursor: pointer;
  `;
const PhoneImg = styled.img`
  width: 24px;
  height: 30px;
  background: #00B098;
`;
const RegisterImg = styled.img`
  width: 30px;
  height: 39px;
`;
const InputTel = styled.input`
  display: inline-flex;
  height: 30px;
  margin:0 15px;
  font-size: 16px;
  color: #666;
  border: none;
  outline: none;
`;
const ReBotton = styled.button`
  margin-top: 38px;
  border-radius: 50px;
  width: 150px;
  height: 42px;
  background: #1ECFB1;
  color: #fff;
  font-size: 18px;
  &:hover{background: #00B098}
`;
const TextMess = styled.div`
    display: flex;
`;
const ButtonNext = styled.button`
  width: 250px;
  height: 50px;
  background: #1ECFB1;
  color: #fff;
  margin: 25px auto;
  font-size: 19px;
  border-radius: 40px;
  &:hover{background: #00B098}
`;
const TextTip = styled.text`
  font-size: 14px;
  color: #BEC1C2;
`;
const InputTip = styled.text`
  color: red;
`;

class ApplyKiki extends React.Component{
  constructor(){
    super();
    this.state = {
      verifyCode: '',
      verifyCodeError: '',
      verifyCodeErrorTip: '',
      smsCode: '',
      phone: '',
      phoneError: '',
      phoneErrorTip: '',
      status: false,
      username: '',
      password: '',
      pwdError: '',
      pwdErrorTip: '',
      controllShow: false,
    }
  }
  //监听input中的数据，保存到state中
  onInput(key, value){
    this.setState({
      [key]: value
    })
  }

  /**
   * 检查电话号码是否为空
   */
  checkPhone(phone){
    console.log("检查电话号码是否为空",phone)
    let empty = (!phone) ||(!phone.trim());
    if(empty){
      this.setState({verifyCodeErrorTip: '手机号码不能为空'});
      return '*手机号码不能为空'
    }
  }

  /**
   * 检查验证码是否为空
   */
  checkVerifyCode(verifyCode){
    console.log("检查验证码是否为空",verifyCode)
    let empty = (!verifyCode) || (!verifyCode.trim());
    if(empty){
      this.setState({phoneErrorTip: '检查验证码不能为空'});
      return'*验证码不能为空'
    }
  }

  /**
   * 检查密码是否为空
   */
  checkPwd(password){
    console.log(password);
    let empty = (!password) || (!password.trim());
    if(this.state.password == ""){
      const controllShow = this.state.controllShow;
      this.setState({controllShow: true})
    }
    if(empty){
      this.setState({pwdErrorTip: '密码不能为空'});
      return'*密码不能为空'
    }
  }


  //判断验证码
  checkVerify(){
    let verifyCode = this.checkVerifyCode((this.state.verifyCode));
    let phone = this.checkPhone(this.state.phone);
    console.log("ssss",verifyCode,phone)
    if(verifyCode){
      this.setState({verifyCodeError: verifyCode})
      return
    }else{
      this.setState({verifyCodeError: ''})
    }
    if(phone) {
      this.setState({phoneError: phone})
      return
    }else{
      this.setState({phoneError: ''})
    }
    console.log("this.state.verifyCode",this.state.verifyCode,this.state.smsCode)
    if(this.state.verifyCode == this.state.smsCode){
      const status = this.state.status;
      this.setState({status: true})
    }else{
      alert("验证码错误")
    }
  }

  //注册检查表单数据
  summitForm(){
    console.log("ddd");
    let password = this.checkPwd(this.state.password);
    if(password){
      this.setState({pwdError: password});
      return
    }else{
      this.setState({pwdError: ''})
    }
    console.log("注册检查表单数据", this.state.username, this.state.password)
  }

  getVerify(){
    console.log("phone",this.state.phone)
    const requestPhone = this.state.phone;
    sendVerify(requestPhone).then(data => {
      if(data.code === 1){
        const verifyCodeData = data.data.smsCode;
        this.setState({smsCode: verifyCodeData})
        // if(verifyCodeData == this.state.verifyCode){
        //   console.log("phone",phone)
        //   const status = this.state.status;
        //   this.setState({ status: true });
        //   console.log("this.state",status)
        // }
      }
    })
  }


  render(){
    console.log("sss",this.state.status)
    return (
      <div>
        {this.state.status === true ?
          <ReForm>
            <FormTitle>
              <LoginTitle>设置账户</LoginTitle>
            </FormTitle>
            <TextView>
              <PhoneImg src={icPhone} alt="icPhone"/>
              <InputTel type="text" placeholder="请输入账户名" value={this.state.phone} onChange={(e) => this.onInput('phone',e.target.value)}></InputTel>
            </TextView>
            <InputTip>{this.state.phoneErrorTip}</InputTip>
            <TextMess>
              <TextView>
                <RegisterImg src={reMessage} alt="reMessage"/>
                <InputTel type="text" placeholder="请输入验证码" value={this.state.verifyCode} onChange={(e) => {this.onInput('verifyCode',e.target.value)}}></InputTel>
              </TextView>
                <ReBotton onClick = {() => {this.getVerify()}}>获取验证码</ReBotton>
            </TextMess>
              <InputTip>{this.state.verifyCodeErrorTip}</InputTip>
            <ButtonNext onClick ={() => this.checkVerify()}>下一步</ButtonNext>
          </ReForm> :
          <ReForm>
            <FormTitle>
              <LoginTitle>填写资料</LoginTitle>
            </FormTitle>
            <TextView>
              <PhoneImg src={icPhone} alt="icPhone"/>
              <InputTel type="text" placeholder="请输入用户昵称" value={this.state.username} onChange={(e) => this.onInput('username', e.target.value)}></InputTel>
            </TextView>
            <TextTip>如果不设置，手机号将作为您的用户昵称</TextTip>
            <TextView>
              <PhoneImg src={icPasd} alt="icPasd"/>
              <InputTel type="text" placeholder="请设置登录密码" value={this.state.password} onChange={(e) => this.onInput('password', e.target.value)}></InputTel>
            </TextView>
            {this.state.controllShow === true ? <InputTip>密码不能为空</InputTip> :<TextTip>必须包含英文且不能带有特殊符号</TextTip>}
            <TextView>
              <PhoneImg src={icPasd} alt="icPasd"/>
              <InputTel type="text" placeholder="请再次输入登录密码" value={this.state.password} onChange={(e) => this.onInput('password', e.target.value)}></InputTel>
            </TextView>
            {this.state.controllShow === true ? <InputTip>密码不能为空</InputTip> :<TextTip>必须包含英文且不能带有特殊符号</TextTip>}
            <ButtonNext onClick={(e) => {this.summitForm()}}>注册</ButtonNext>
          </ReForm>
        }
      </div>
    );
  }
}

ApplyKiki.propTypes = {

};

export default ApplyKiki;
