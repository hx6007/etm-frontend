/**
 *
 * UserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {Switch, Route, Link} from 'react-router-dom';
import userTopbg from 'images/user/userTopbg.jpg';
import avatar from 'images/user/avatar.svg';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import styled from 'styled-components';
import AddressListPage from 'containers/AddressListPage/Loadable';
import AddressEditPage from 'containers/AddressEditPage';
import makeSelectUserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import HtmlTitle from '../../components/HtmlTitle/index';
import MainHead from '../../components/MainHead';
import MainBottom from '../../components/MainBottom';
import PersonCard from '../../components/PersonCard';
import Collect from "../../components/Collect/index";
import {MyNavItem, OuterNavItem} from "./MyNavItem";
import {makeSelectCustomerNo, makeSelectUserId} from "../App/selectors";
import UpPassWord from "../../components/UpPassWord/index";
import {SITE_CODE} from "../../utils/serverUrl";


const Mycontent = styled.div`
`;
const MyTop = styled.div`
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 150px;
  text-align: center;
`;
const MyBaseMsg = styled.div`
  position: absolute;
  display:flex;
  flex-direction: row;
  width: 1200px;
  top: 60px;
  left: 50%;
  margin-left: -600px;
  text-align: center;
`;
const ImgUrseTopbg = styled.img`
  width: 100%;
  height: 140px;
`;
const Avatar = styled.img`
  width: 100px;
  background: white;
  height: 100px;
  box-shadow: 0px 0px 1px 2px #fff;
  border-radius: 50%;
`;
const MyBox = styled.div`
  width: 1200px;
  margin: 0 auto;
  min-height: 600px;
`;
const MyTitle = styled.p`
  padding-left: 270px;
  font-size: 20px;
  color: #666666;
  margin: 0;
`;
const MessageBox = styled.div`
  width:900px;
  margin: 10px 0 0 10px;
  border-top:1px solid #ddd;
`;
const Usercontent = styled.div`
  display:flex;
  flex-direction: row;
  .ant-menu-inline .ant-menu-submenu-title {
    font-size: 16px;
  }
  .ant-menu-submenu > .ant-menu {
    background-color: #FAFAFA;
    border-radius: 4px;
}
`;


export class UserPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // 父级菜单的key
  rootSubmenuKeys = ['sub1','sub2','sub3','sub4','sub5'];
  constructor(props) {
    super();
    this.state = {
      activeTab:1,
      defaultSelectedKeys:"MenuItem-0-0",
      openKeys:['sub1'],
    };
    if(!props.user_id){
      props.history.push('/login');
      alert('您尚未登录！')
      return
    }
  }

  handleClick(e){
    console.log('click', e)
  }

  onOpenChange = (openKeys) => {
    console.log("open",openKeys);
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    console.log("late",latestOpenKey);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
    console.log("open",openKeys);
  }

  setOaUrl(urlnumber,urltype=18){
    let erpUrl = "http://crm.fslola.cn:9001/login.do";
    const props = this.props;
    return `${erpUrl}?account=${props.customer_no}&site_code=${SITE_CODE}&wai=lolahome&back_url=app/0/${urlnumber}/${urltype}/${urlnumber}_frame.jsp`
  }

  MenuItemHtml(menuItem,menuItemkey){
    return menuItem.map((item,key) => {
      return (<MenuItem key={"MenuItem-"+menuItemkey+"-"+key}>
        {item.target ? <OuterNavItem href={item.url} target={item.target}>{item.name}</OuterNavItem>
        :<MyNavItem  to={item.url} id={item.id}>{item.name}</MyNavItem>}
        </MenuItem>)
    })
  }

  submenuHtml(sidebar){
    return  sidebar.map((item,key) => {
         return  <SubMenu key={"sub"+(key+1)} title={<span><Icon type={item.icon} style={{fontSize: 20}} /><span>{item.title}</span></span>}>
              {this.MenuItemHtml(item.children,key)}
          </SubMenu>
    }
    )
  }

  render() {
    //Tab点击修改样式和修改小页面标题
    const props = this.props;
    // console.log("props",props);
    const paramsUrl = props.location.pathname;
    let Title = "个人中心";
    switch (paramsUrl){
      case "/user/person":
        Title = "个人中心";
        break;
      case "/user/addressList":
        Title = "我的地址";
        break;
      case "/user/addressEdit":
        Title = "我的地址";
        break;
      case "/user/collect":
        Title = "我的收藏";
        break;
      case "/user/upPassWord":
        Title = "修改密码";
        break;

    }
    let rzsqNum = "8700167";
    switch (SITE_CODE){
      case "51exc":
        rzsqNum = "8000053";
        break;
      case "97ejk":
        rzsqNum = "6800053";
        break;
    }
    let sidebar = [];
    let b2bSite = ["51etm","51exc","97ejk","ezz168","97efx"];
    let commonSidebar = [
      {
        "title":"账号管理",
        "icon":"setting",
        "children":[
          {
            "url":"/user",
            "id":paramsUrl === "/user",
            "name":"个人中心"
          },{
            "url":"/user/collect",
            "id":paramsUrl === "/user/collect",
            "name":"我的收藏"
          },{
            "url":"/user/addressList",
            "id":(paramsUrl === "/user/addressList" || paramsUrl === "/user/addressEdit"),
            "name":"我的地址"
          },{
            "url":"/user/upPassWord",
            "id":paramsUrl === "/user/upPassWord",
            "name":"修改密码"
          },
        ]
      },
      {
        "title":"订单中心",
        "icon":"profile",
        "children":[
          {
            "url":this.setOaUrl("8700165"),
            "target":"_blank",
            "name":"订单列表"
          },{
            "url":this.setOaUrl("8700166"),
            "target":"_blank",
            "name":"提货单列表"
          },
        ]
      },{
        "title":"财务管理",
        "icon":"appstore",
        "children":[
          {
            "url":this.setOaUrl("8700171"),
            "target":"_blank",
            "name":"余额查询"
          },{
            "url":this.setOaUrl("8700120"),
            "target":"_blank",
            "name":"对账单查询"
          },
          {
            "url":this.setOaUrl(rzsqNum),
            "target":"_blank",
            "name":"入账申请"
          },{
            "url":this.setOaUrl("8700168"),
            "target":"_blank",
            "name":"退货申请"
          },
        ]
      },{
        "title":"产品查询",
        "icon":"inbox",
        "children":[
          {
            "url":this.setOaUrl("8200031"),
            "target":"_blank",
            "name":"货物查询"
          },{
            "url":this.setOaUrl("8200033"),
            "target":"_blank",
            "name":"库存查询"
          },
        ]
      },
    ]
    let zcgl = {
      "title":"众筹管理",
      "icon":"switcher",
      "children":[
        {
          "url":this.setOaUrl("8600071"),
          "target":"_blank",
          "name":"提货通知单"
        },{
          "url":this.setOaUrl("8600037"),
          "target":"_blank",
          "name":"认筹对账单"
        },
        {
          "url":this.setOaUrl("8600038"),
          "target":"_blank",
          "name":"进销存查询"
        },{
          "url":this.setOaUrl("8600082"),
          "target":"_blank",
          "name":"贷款还款列表"
        },{
          "url":this.setOaUrl("8600039"),
          "target":"_blank",
          "name":"贷款申请"
        },
      ]
    }
    if(b2bSite.indexOf(SITE_CODE) != "-1") sidebar = sidebar.concat(commonSidebar)
    {SITE_CODE ==="51etm" || SITE_CODE === "51exc" ? sidebar.push(zcgl):""}

    return (
      <div>
        <HtmlTitle />
        <MainHead />
        <Mycontent>
          <MyTop>
            <ImgUrseTopbg src={userTopbg} />
            <MyBaseMsg>
              <Avatar src={avatar} />
            </MyBaseMsg>
          </MyTop>
          <MyBox>
            <MyTitle>{Title}</MyTitle>
            <Usercontent>
              <Menu
                onClick={this.handleClick}
                defaultSelectedKeys={[this.state.defaultSelectedKeys]}
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{width: 256,backgroundColor: '#FAFAFA',height: 400}}
              >
              {this.submenuHtml(sidebar)}
              </Menu>
              <MessageBox>
                <Switch>
                  <Route exact path="/user/addressList" component={AddressListPage} />
                  <Route exact path="/user/addressEdit" component={AddressEditPage} />
                  <Route exact path="/user/collect" component={Collect} />
                  <Route exact path="/user/upPassWord" component={UpPassWord} />
                  <Route component={PersonCard} />
                </Switch>
              </MessageBox>
            </Usercontent>
          </MyBox>
        </Mycontent>
        <MainBottom />
      </div>
    );
  }
  // getPerson(props){
  //   return <PersonCard userMessage = {this.state.userMessage}></PersonCard>;
  // }
  // getMyadd(props) {
  //   return <AddressListPage getAddeditf={this.getAddedit}></AddressListPage>;
  // }
  // getCollect(props) {
  //   return  <CollectBox></CollectBox>;
  // }

}

UserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
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


const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userPage', reducer });
const withSaga = injectSaga({ key: 'userPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserPage);
