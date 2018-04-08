
import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const md5Base64 = require('md5-base64');
import icPhone from 'images/login/phone.png';
import icPasd from 'images/login/pasd.png';
import icEmail from 'images/login/email.png';
import {login as loginRequest,getUserInfo as getUserInfoRequest} from 'utils/service.js';
import {SITE_CODE} from "../../utils/serverUrl.js"
import {getYtmwb2bProducHall} from "../../utils/service";


const LoginFormDiv = styled.div`
    display: flex;
    flex-flow: column wrap;
  `;
const FormTitle = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;
const LoginTitle = styled.span`
    padding:5px 10px;
    font-size: 22px;
    font-weight: bold;
    color: ${changeColor(SITE_CODE).fontColor};
    border-bottom: 3px solid ${changeColor(SITE_CODE).borderColor};
    cursor: pointer;
  `;
const ResetTitle = styled(LoginTitle)`
    display: none;
  `;
const LoginFormView = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin-top: 30px;
    //display: none;
  `;
const TextView = styled.div`
    padding-bottom: 8px;
    border-bottom: 1px solid #999;
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
const PhoneImg = styled.img`
    width: 24px;
    height: 30px;
    background: #e55062;
`;
const YtmwPhone = styled.span`
    background: #e55062;
`;
const InputPassword = styled(InputTel)``;
const PasdImg = styled(PhoneImg)``;
const TelError = styled.span`
    height: 25px;
    padding-bottom: 8px;
    color: #e72b06;
  `;
const PasswordError = styled(TelError)``;
const ForgetView = styled.div`
    display: flex;
    justify-content: flex-end;
  `;
const ForgetPW = styled.a`
    cursor: pointer;
    color: #E793E2;
  `;
const LoginBtn = styled.button`
    width: 280px;
    height: 50px;
    margin-top: 10px;
    border: none;
    outline: none;
    font-size: 22px;
    color: #fff;
    background: ${changeColor(SITE_CODE).backgroundColor};
    border-radius: 50px;
    cursor: pointer;
    &:hover,&:focus,&:active{
      background: ${changeColor(SITE_CODE).hoverColor};
    }
  `;
const LoginBtnError = styled(TelError)``;
const RegisterLink = styled(Link)`
    width: 280px;
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
    margin-bottom: 15px;
    border: none;
    outline: none;
    text-decoration: none;
    text-align: center;
    font-size: 22px;
    border-radius: 50px;
    cursor: pointer;
    background: #fff;
    color: ${changeColor(SITE_CODE).backgroundColor};
    border: 1px solid ${changeColor(SITE_CODE).backgroundColor};
    &:hover,&:focus,&:active{
      color: ${changeColor(SITE_CODE).hoverColor};
      border: 1px solid ${changeColor(SITE_CODE).hoverColor};
      background: none;
    }
  `;
const ResetFormView =styled.div`
    display: flex;
    flex-flow: column wrap;
    margin-top: 30px;
    //display: none;
  `;
const ValidationView = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;
const ValidationTextView = styled.div`
    padding-bottom: 8px;
    border-bottom: 1px solid #999;
  `;
const EmailImg = styled(PhoneImg)`
    height: 20px;
  `;
const InputCode = styled.input`
    display: inline-flex;
    width: 130px;
    height: 30px;
    margin:0 15px;
    font-size: 16px;
    color: #666;
    border: none;
    outline: none;
  `;
const ValidationBtn = styled.button`
    width: 110px;
    height: 40px; 
    font-size: 16px;
    color: #fff;
    background: #ee6e7e;
    outline: none;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    &:hover,&:focus,&:active{
      background: #e55062;
    }
  `;
const ConfirmBtn = styled.button`
    width: 280px;
    height: 50px;
    margin: 5px auto;
    font-size: 22px;
    color: #fff;
    background: #ee6e7e;
    outline: none;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    &:hover,&:focus,&:active{
      background: #e55062;
    }
  `;

function changeColor(SITE_CODE) {
  switch (SITE_CODE){
    default:
    case "51etm":
      return {fontColor: "#e55062",borderColor: "#e55062",backgroundColor: "#ee6e7e", hoverColor: "#e55062" };
    case "97ejk":
      return {fontColor: "#442517", borderColor: "#442517", backgroundColor: "#a86f4f", hoverColor: "#412517"};
    case "51exc":
      return {fontColor: "#39AF98", borderColor: "#39AF98", backgroundColor: "#51CEB0", hoverColor: "#39AF98"};
    case "kiki":
      return {fontColor: "#595656", borderColor: "#595656", backgroundColor: "#595656", hoverColor: "#999"};
    case "51ecg":
      return {fontColor: "#84a93d", borderColor: "#84a93d", backgroundColor: "#84a93d", hoverColor: "#d5e459"};
    case "97efx":
      return {fontColor: "#ecb736", borderColor: "#ecb736", backgroundColor: "#ecb736", hoverColor: "#ffd672"};
    case "ezz168":
      return {fontColor: "#81c13d", borderColor: "#81c13d", backgroundColor: "#9fcc66", hoverColor: "#81c13d"};
    case "168ezc":
      return {fontColor: "#65c2c9", borderColor: "#65c2c9", backgroundColor: "#37aab3", hoverColor: "#65c2c9"};
    case "maqiduo":
      return {fontColor: "#1065af", borderColor: "#1065af", backgroundColor: "#4093dc", hoverColor: "#1065af"};
    case "lola_ceramics":
      return {fontColor: "#2a1608", borderColor: "#2a1608", backgroundColor: "#2a1608", hoverColor: "#fdb811"};
  }
}


class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userError:"",
      passwordError:"",
      loginBtnError:"",
      username:"",
      password:"",
      tabChange:1,
      userTelPhone:"",
      verificationCode:"",
      newPassword:"",
      comfirmPassword:"",
      resetErrorTip:"",
      ticket: ""
    }
  }

  //监听input中的数据，保存到state中
  onInput(key,value){
    this.setState({
      [key]:value
    })
  }

  //点击登录按钮，触发后台接口提供的验证，对数据的处理等方法
  handleClick(){
    let usernameError=this.checkUsernameError(this.state.username);
    let passwordError=this.checkPasswordError(this.state.password);
    if(usernameError){
      this.setState({
        userError:usernameError
      })
      return;
    }else{
      this.setState({
        userError:''
      })
    }
    if(passwordError){
      this.setState({
        passwordError:passwordError
      })
      return;
    }else{
      this.setState({
        passwordError:''
      })
    }
    this.login(this.state.username,this.state.password);
  }

  /**
   * 检查用户名错误 返回错误信息
   */
  checkUsernameError(username){
    let empty=(!username)||(!username.trim());
    if(empty){
      return '* 账号不能为空'
    }
  }

  /**
   * 检查密码错误 返回错误信息
   */
  checkPasswordError(password){
    let empty=(!password)||(!password.trim());
    if(empty){
      return '* 密码不能为空'
    }
  }

  /**
   * 调用登录接口，进行网络请求
   */
  login(username,password){
    password=md5Base64(password);
    loginRequest(username,password).then(data=>{
      if(data.code===1){
        const ticket=data.data.token;
        this.props.onReceiveTicket(ticket);
        this.setState({ticket: ticket})
        const userId = data.data.userid;
        this.getUserInfo(userId);
      }else {
        throw data.message;
      }
    }).catch(error=>{
      this.onFailed(error);
    })
  }

  /**
   *登录失败的情况
   */
  onFailed(error){
    console.log(error);
    this.setState({
      loginBtnError:error,
    })
  }

  /**
   * 获取用户信息
   */
  getUserInfo(userId){
    getUserInfoRequest(userId).then(data=>{
      console.log("获取用户信息",data);
      if(data.code===1){
        if(data.code !== 1)throw '读取用户信息失败';
        let userInfo = data.data;
        let currentUser={
          id: userInfo.userid,//会员ID
          customer_no: userInfo.customer_no,//用户编号
          type: userInfo.type,//客户类型
          name: userInfo.username,//名称
          level: 0,//用户等级： 1 游客 2 注册会员 3 vip 4 白金
          is_validate: null, //非会员0, 会员为1,白金为2, 不传值为面价
          ticket: this.state.ticket,//登录后获取ticket
        };
          switch (userInfo.customer_grade){
            case "白金客户":
              currentUser.level = 3;
              currentUser.is_validate = 2;
            break;
            case "签约客户":
              currentUser.level = 2;
              currentUser.is_validate = 1;
            break;
            case "注册客户":
              currentUser.level = 1;
              currentUser.is_validate = 0;
            break;
          }
          let productHalls = "";
          let siteCode = SITE_CODE;
        if(SITE_CODE === "51etm"){
          siteCode= userInfo.site_code;//所属平台ID
          switch (userInfo.site_code){
            case '51exc':
              siteCode='decoration';
              break;
            case '97efx':
              siteCode='store';
              break;
            case 'ezz168':
              siteCode='store';
              break;
          }
        }
          this.props.onReceiveUserInfo(currentUser,siteCode,productHalls);
        }else {
          throw data;
        }
    }).catch(error=>{
      this.onFailed(error);
    })
  }

  /**
   * 确认找回密码部分:
   */
  comfirmHandleClick(){
    let reg_telPhone = /^1[34578]\d{9}$/;
    if(!reg_telPhone.test(this.state.telPhone)){
      this.setState({
        resetErrorTip:"* 请输入正确的手机号"
      })
    }else if(!this.state.verificationCode){
      this.setState({
        resetErrorTip:"* 请输入正确的验证码"
      })
    }else if(!this.state.newPassword){
      this.setState({
        resetErrorTip:"* 请输入新密码"
      })
    }else if(this.state.comfirmPassword != this.state.newPassword){
      this.setState({
        resetErrorTip:"* 请确认新密码"
      })
    }
  }

  componentDidMount(){ }
  //获取账号登录表单的视图
  getLoginFormView(){
    const B2cSiteCode = ["kiki","maqiduo","like_peach","lola_ceramics"];
    const showornot = B2cSiteCode.indexOf(SITE_CODE) === -1;
      return   <LoginFormView>
      <TextView>
        {SITE_CODE == "51etm" ? <PhoneImg src={icPhone} alt="icPhone"/> : <YtmwPhone alt="icPhone"/> }
        <InputTel type="text" placeholder="请输入账户名" defaultValue={this.state.username} onChange={(e)=>this.onInput('username',e.target.value)}></InputTel>
      </TextView>
      <TelError>{this.state.userError}</TelError>
      <TextView>
        {SITE_CODE == "51etm" ? <PasdImg src={icPasd} alt="icPasd"/> : <YtmwPhone alt="icPhone"/> }
        <InputPassword type="password" placeholder="请输入密码" defaultValue={this.state.password} onChange={(e)=>this.onInput('password',e.target.value)}></InputPassword>
      </TextView>
      <PasswordError>{this.state.passwordError}</PasswordError>
      <ForgetView>
        {/*<ForgetPW onClick={(e) => this.setState({tabChange:2})}>忘记密码</ForgetPW>*/}
      </ForgetView>
      <LoginBtn onClick={this.handleClick.bind(this,this.state.username,this.state.password)}>登录</LoginBtn>
      <LoginBtnError>{this.state.loginBtnError}</LoginBtnError>
        {showornot ? <RegisterLink to='/apply'>注册</RegisterLink> :"" }
    </LoginFormView>
  }

  //获取找回密码表单的视图
  getResetFormView(){
    return  <ResetFormView>
      <TextView>
        <PhoneImg src={icPhone} alt="icPhone"/>
        <InputTel type="number" placeholder="请输入手机号码" value={this.state.userTelPhone} onChange={(e)=>this.onInput('userTelPhone',e.target.value)}></InputTel>
      </TextView>
      <TelError>{this.state.resetErrorTip}</TelError>
      <ValidationView>
        <ValidationTextView>
          <EmailImg src={icEmail} alt="icEmail"/>
          <InputCode type="text" placeholder="请输入验证码" value={this.state.verificationCode} onChange={(e)=>this.onInput('verificationCode',e.target.value)}></InputCode>
        </ValidationTextView>
        <ValidationBtn>获取验证码</ValidationBtn>
      </ValidationView>
      <TelError>{this.state.resetErrorTip}</TelError>
      <TextView>
        <PasdImg src={icPasd} alt="icPasd"/>
        <InputPassword type="password" placeholder="请输入新密码" value={this.state.newPassword} onChange={(e)=>this.onInput('newPassword',e.target.value)}></InputPassword>
      </TextView>
      <TelError>{this.state.resetErrorTip}</TelError>
      <TextView>
        <PasdImg src={icPasd} alt="icPasd"/>
        <InputPassword type="password" placeholder="请确认新密码" value={this.state.comfirmPassword} onChange={(e)=>this.onInput('comfirmPassword',e.target.value)}></InputPassword>
      </TextView>
      <TelError>{this.state.resetErrorTip}</TelError>
      <TelError></TelError>
      <ConfirmBtn onClick={(e)=>{this.comfirmHandleClick()}}>确定</ConfirmBtn>
    </ResetFormView>
  }

  render(){
    return(
      <LoginFormDiv>
        <FormTitle>
          <LoginTitle onClick={e => this.setState({tabChange:1})}>账号密码登录</LoginTitle>
          <ResetTitle onClick={e => this.setState({tabChange:2})}>找回密码</ResetTitle>
        </FormTitle>
        {this.state.tabChange === 1 ? this.getLoginFormView() : this.getResetFormView()}
      </LoginFormDiv>
    );
  }
}

export default LoginForm;

