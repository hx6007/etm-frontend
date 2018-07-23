const md5Base64 = require('md5-base64');
import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import icPhone from 'images/login/phone.png';
import icPasd from 'images/login/pasd.png';
import {getUserInfo as getUserInfoRequest, login as loginRequest} from 'utils/service.js';
import {SITE_CODE} from "../../utils/serverUrl.js"

const LoginFormDiv = styled.div`
    display: flex;
    flex-flow: column wrap;
    padding: 30px 30px;
  `;
const LoginTitle = styled.span`
    padding:5px 0 12px;
    font-size: 22px;
    font-weight: bold;
    color: ${changeColor(SITE_CODE).fontColor};
  `;
const TextView = styled.div`
    display: flex;
    flex-direction: row;
    margin: 12px 0;
    align-items: center;
    padding: 0 0 5px 0;
    border-bottom: 1px solid #ddd;
  `;
const InputTel = styled.input`
    height: 30px;
    font-size: 16px;
    padding-left: 12px;
    color: #333;
    flex: 1;
    border: none;
    outline: none;
  `;
const PhoneImg = styled.img`
    width: 16px;
    height: 20px;
    background: #e55062;
`;
const PasdImg = styled(PhoneImg)``;
const Error = styled.span`
    font-size: 12px;
    margin-bottom: -8px;
    color: #e72b06;
  `;
const LoginBtn = styled.button`
    padding: 8px 0;
    border: none;
    outline: none;
    font-size: 14px;
    margin-top: 12px;
    color: #f5f5f5;
    background: ${changeColor(SITE_CODE).backgroundColor};
    border-radius: 50px;
    cursor: pointer;
    &:hover,&:focus,&:active{
      background: ${changeColor(SITE_CODE).hoverColor};
    }
  `;
const Loading=styled(LoginBtn)`
  background:#ddd;
   &:hover,&:focus,&:active{
      background: #ddd
    }
`;
const RegisterLink = styled(Link)`
    padding: 8px 0;
    margin-top: 8px;
    font-size: 14px;
    outline: none;
    text-decoration: none;
    text-align: center;
    border-radius: 50px;
    cursor: pointer;
    background: #fff;
    color: ${changeColor(SITE_CODE).backgroundColor};
    border: 1px solid ${changeColor(SITE_CODE).backgroundColor};
    &:hover,&:focus,&:active{
      color: white;
      background:  ${changeColor(SITE_CODE).hoverColor};
      border: 1px solid white;
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
      username:"",
      password:"",
      error:false,
      loading:false,
    }
  }
  //点击登录按钮，触发后台接口提供的验证，对数据的处理等方法
  handleClick=()=>{
    const { username ,password  } =this.state;
    if(!username) {
      this.setState({ error:'请输入用户名' })
    }else if(!password){
      this.setState({ error:'请输入密码' })
    }else{
      this.setState({ error:false,loading:true});
      this.login(username,md5Base64(password));
    }
  };

  /**
   * 调用登录接口，进行网络请求
   */
  login(username,password){
    loginRequest(username,password).then(data=>{
      if(data.code===1){
        const ticket=data.data.token;
        this.props.onReceiveTicket(ticket);
        this.setState({ticket: ticket,username2: data.data.username2,logSiteCode: data.data.site_code,customer_grade: data.data.customer_grade})
        const userId = data.data.userid;
        this.getUserInfo(userId);
      }else {
        throw data.message;
      }
    }).catch(error=>{
      this.setState({error,loading:false});
    })
  }

  /**
   * 获取用户信息
   */
  getUserInfo(userId){
    getUserInfoRequest(userId).then(data=>{
      console.log("获取用户信息",data);
      if(data.code===1){
        let userInfo = data.data;
        let currentUser={
          id: userInfo.userid,//会员ID
          customer_no: userInfo.customer_no,//用户编号
          type: userInfo.type,//客户类型
          name: userInfo.username,//名称
          level: 0,//用户等级： 1 游客 2 注册会员 3 vip 4 白金
          is_validate: null, //非会员0, 会员为1,白金为2, 不传值为面价
          ticket: this.state.ticket,//登录后获取ticket
          username2: this.state.username2,//子账号用户名
          logSiteCode: this.state.logSiteCode,//登录后的site_code
          customer_grade: this.state.customer_grade
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
          throw '获取用户信息失败';
        }
    }).catch(error=>{
      this.setState({error,loading:false});
    })
  }

  render(){
    const hideRegister = ["kiki","maqiduo","like_peach","lola_ceramics"].includes('SITE_CODE');
    const {username,password,error,loading}=this.state;
    return(
      <LoginFormDiv>
          <LoginTitle>账号密码登录</LoginTitle>
            <TextView>
              {SITE_CODE === "51etm" && <PhoneImg src={icPhone} alt="icPhone"/>}
              <InputTel type="text" placeholder="请输入账户名" defaultValue={username}
                        onChange={(e) => this.setState({username: e.target.value})}/>
            </TextView>
            <TextView>
              {SITE_CODE === "51etm" && <PasdImg src={icPasd} alt="icPasd"/> }
              <InputTel type="password" placeholder="请输入密码" defaultValue={password}
                        onChange={(e) => this.setState({password:e.target.value})}
                        onKeyPress={e => e.key === 'Enter'&&this.handleClick()}/>
            </TextView>
            {error&& <Error>{error}</Error>}
            {loading?<Loading>登录中...</Loading>:<LoginBtn onClick={this.handleClick}>登 录</LoginBtn>}
            {!hideRegister && <RegisterLink to='/apply'>注 册</RegisterLink> }
      </LoginFormDiv>
    );
  }
}

export default LoginForm;

