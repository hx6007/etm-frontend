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
import {makeSelectCustomerNo, makeSelectUserId, makeSelectUserName2} from "../App/selectors";
import UpPassWord from "../../components/UpPassWord/index";
import {SITE_CODE} from "../../utils/serverUrl";
import SonAccountPage from "../SonAccountPage/Loadable";
import SonAccountEditPage from "../SonAccountEditPage/Loadable";
import OrderListPage from "../OrderListPage/Loadable";
import PerOrderListPage from "../PerOrderListPage/Loadable";
import Form from "../Form/Loadable";
import PerOrderDetailPage from "../PerOrderDetailPage/index";
import FinancialPage from "../FinancialPage/Loadable";
import PriceDetail from "../../components/PriceDetail/index";
import InBalances from "../../components/InBalances/index";
// import CheckAllPage from "../CheckAllPage/index";
import CrowdfundPage from "../CrowdfundPage/Loadable";
import {JinXiaoCunSearchPage} from "../JinXiaoCunSearchPage";


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
      sonShow: "son",
      haveOrNot: "have"
    };
    if(!props.user_id){
      props.history.push('/login');
      alert('您尚未登录！')
      return
    }
  }

  handleClick(e){
    // console.log('click', e)
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  setOaUrl(urlnumber,urltype=18){
    let erpUrl = "http://crm.fslola.cn:9001/login.do";
    const props = this.props;
    return `${erpUrl}?account=${props.customer_no}&site_code=${SITE_CODE}&wai=lolahome&back_url=app/0/${urlnumber}/${urltype}/${urlnumber}_frame.jsp`
  }

  MenuItemHtml(menuItem,menuItemkey){
    return menuItem.map((item,key) => {
      return ( item.url !== undefined ? <MenuItem key={"MenuItem-"+menuItemkey+"-"+key}>
        {item.target ? <OuterNavItem href={item.url} target={item.target}>{item.name}</OuterNavItem>
            :<MyNavItem  to={item.url} id={item.id}>{item.name}</MyNavItem>

        }
        </MenuItem> : "")
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
    console.log("props",props);
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
      case "/user/sonAccount":
        Title = "子账号管理";
        break;
      case "/user/sonAccountEdit":
        Title = "子账号管理";
        break;
      case "/user/orderList":
        Title = "订单管理";
        break;
      case "/user/perOrderList":
        Title = "订单列表";
        break;
      case "/user/financial":
        Title = "财务管理";
        break;
      case "/user/crowdfund":
        Title = "提货通知单";
        break;
      case "/user/JinXiaoCunSearch":
        Title = "进销存查询";
        break;
    }
    // let rzsqNum = "8700167";
    //订单列表
    let OrderList = "8700165";
    //提货单列表
    let catchOrderList = "8700166";
    //余额查询
    let balance = "8700171";
    //对账单查询
    let checkBalance = "8700120";
    //入账单申请
    let inBalance = "8700167";
    //退货申请
    let returnGoods = "8700168";
    //货物查询
    let checkGoods = "8200031";
    //库存查询
    let checkSave = "8200033";
    //子账号货物查询
    let sonCheckGoods;
    //子账号库存查询
    let sonCheckSave;
    //子账号入账单
    let sonInBalance;
    //产品价格查询
    let checkGoodsPrice;
    //找砖子账号提货单管制表
    let sonPickGood;

    switch (SITE_CODE){
      case "51exc":
        // rzsqNum = "8000053";
        OrderList = "8000022";
        catchOrderList = "8700166";
        balance = "8000054";
        checkBalance = "8000027";
        inBalance = "8000053";
        returnGoods = "8000058";
        checkGoods = "8000030";
        checkSave = "8000055";
        break;
      case "97ejk":
        inBalance = "6800053";
        break;
      case "ezz168":
        OrderList = "8200028";
        catchOrderList = "8200143";
        balance = "8200032";
        checkBalance = "8200178";
        inBalance = "8200022";
        returnGoods = "8200034";
        checkGoods = "8200031";
        checkSave = "8000025";
        sonCheckGoods = "8200031";
        sonCheckSave = "8000025";
        sonInBalance = "8200022";
        checkGoodsPrice = "8200030";
        sonPickGood = "8200282"
        break;
      case "97efx":
        OrderList = "5600085";
        catchOrderList = "5600004";
        balance = "300119";
        checkBalance = "300193";
        inBalance = "300197";
        returnGoods = "";
        checkGoods = "5600007";
        checkSave = "8000025";
        sonCheckGoods = "5600007";
        sonCheckSave = "8000025";
        sonInBalance = "300197";
        checkGoodsPrice = "8500183";
      break;

    }
    let sidebar = [];
    let b2bSite = ["51etm","51exc","97ejk","ezz168","97efx"];
    let commonSidebar;
    //是否显示子账号管理
    let showOrNot;
    //找砖，分销显示待审核订单
    let showStandbyOrderOrNot;
    //找砖，分销显示价格查询
    let checkGoodsPrices;
    //找砖子账号提货单管制表
    let sonPickGoods;
    if((SITE_CODE === "ezz168" || SITE_CODE === "97efx") && this.props.username2 === null){
      showOrNot={
                 "url":"/user/sonAccount",
                 "id":paramsUrl === "/user/sonAccount",
                 "name":"子账号管理"};
      showStandbyOrderOrNot={
                 "url":"/user/orderList",
                 "id":paramsUrl === "/user/orderList",
                 "name":"待审核订单"};
      checkGoodsPrices={
                 "url":this.setOaUrl(checkGoodsPrice),
                 "target":"_blank",
                 "name":"价格查询"}
    }else{
      showOrNot = {};
      showStandbyOrderOrNot = {};
      checkGoodsPrices = {};
    }
    if(SITE_CODE === "ezz168" && this.props.username2 !== null){
      sonPickGoods={
                 "url": this.setOaUrl(sonPickGood),
                 "target":"_blank",
                 "name": "提货单管制表"
      }
    }else {
      sonPickGoods = {};
    }

    let ezzInBalance = `http://crm.fslola.cn:9001/login.do?account=${props.customer_no}&site_code=ezz168&wai=lolahome&back_url=app/0/8200022/16/8200022_frame.jsp`

    let manageAcc =
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
          },showOrNot
        ]
      };
      //找砖跟分销子账号个人中心的订单管理
    if(this.props.username2 !== null && (SITE_CODE === "ezz168" || SITE_CODE === "97efx")){
      let OneCheckGoods;
      let TwoCheckSave;
      let ThreeInBan;
      if(SITE_CODE === "97efx"){
        OneCheckGoods = {
          "url":this.setOaUrl(sonCheckGoods),
          "target":"_blank",
          "name":"货物查询"
        };
        TwoCheckSave = {
          "url":this.setOaUrl(sonCheckSave),
          "target":"_blank",
          "name":"库存查询"
        };
        ThreeInBan = {
          "url":"/user/form",
          "id":paramsUrl === "/user/form",
          "name":"入账申请"
        }
      }else{
        OneCheckGoods = {
          "url":this.setOaUrl(sonCheckGoods),
          "target":"_blank",
          "name":"货物查询"
        };
        TwoCheckSave ={
          "url":this.setOaUrl(sonCheckSave),
          "target":"_blank",
          "name":"库存查询"
        };
        ThreeInBan = {
          "url":(SITE_CODE === "ezz168" ? ezzInBalance : this.setOaUrl(sonInBalance)),
          "target":"_blank",
          "name":"入账申请"
        }
      }
      commonSidebar = [
        manageAcc
        ,{
          "title":"订单管理",
          "icon":"profile",
          "children":[
            {
              "url":"/user/orderList",
              "id":paramsUrl === "/user/orderList",
              "name":"订单列表"
            },
            // {
            //   // "url":this.setOaUrl(sonCheckGoods),
            //   // "target":"_blank",
            //   // "name":"货物查询"
            // },
            OneCheckGoods,
            // {
            //   // "url":this.setOaUrl(sonCheckSave),
            //   // "target":"_blank",
            //   // "name":"库存查询"
            // },
            TwoCheckSave,
            // {
            //   // "url":(SITE_CODE === "ezz168" ? ezzInBalance : this.setOaUrl(sonInBalance)),
            //   // "target":"_blank",
            //   // "name":"入账申请"
            // },
            ThreeInBan,
            sonPickGoods
          ]
        },
      ]
    }else{
      let OneOrder;
      // let TwoPicOrder;
      let ThreeBalance;
      let FourCheckBalance;
      let FiveezzInBalance;
      if(SITE_CODE === "97efx" || SITE_CODE === "51exc" || SITE_CODE === "51etm" || SITE_CODE === "ezz168" || SITE_CODE === "97ejk"){
        OneOrder = {
          "url":"/user/perOrderList",
          "id":paramsUrl === "/user/perOrderList",
          "name":"订单列表"
        };
        // TwoPicOrder = {
        //   "url": undefined,
        //   "id":paramsUrl === "/user/form",
        //   "name":"提货单列表"
        // };
        ThreeBalance = {
          // "url":"/user/form",
          // "id":paramsUrl === "/user/form",
          // "name":"余额查询"
          "url":"/user/financial?status=1",
          "id":paramsUrl === "/user/financial",
          "name":"余额查询"
        };
        FourCheckBalance = {
          "url":"/user/financial?status=2",
          "id":paramsUrl === "/user/financial",
          "name":"资金明细"
        };
        FiveezzInBalance = {
          "url":"/user/financial?status=3",
          "id":paramsUrl === "/user/financial",
          "name":"入账申请"
        }

      }else{
        OneOrder = {
          "url":this.setOaUrl(OrderList),
          "target":"_blank",
          "name":"订单列表"
        };
        // TwoPicOrder = {
        //   "url":this.setOaUrl(catchOrderList),
        //   "target":"_blank",
        //   "name":"提货单列表"
        // };
        ThreeBalance = {
          "url":this.setOaUrl(balance),
          "target":"_blank",
          "name":"余额查询"
        };
        FourCheckBalance = {
          "url":this.setOaUrl(checkBalance),
          "target":"_blank",
          "name":"对账单查询"
        };
        FiveezzInBalance = {
          "url":(SITE_CODE === "ezz168" ? ezzInBalance : this.setOaUrl(inBalance)),
          "target":"_blank",
          "name":"入账申请"
        }
      }
      commonSidebar = [
        manageAcc,
        {
          "title":"订单中心",
          "icon":"profile",
          "children":[
            showStandbyOrderOrNot,
            // {
            // //   // "url":this.setOaUrl(OrderList),
            // //   // "target":"_blank",
            // //   // "name":"订单列表"
            //   "url":"/user/perOrderList",
            //   "id":paramsUrl === "/user/perOrderList",
            //   "name":"订单列表"
            // },
            OneOrder,
            // {
            //   // "url":this.setOaUrl(catchOrderList),
            //   // "target":"_blank",
            //   // "name":"提货单列表"
            //   "url":"/user/form",
            //   "id":paramsUrl === "/user/form",
            //   "name":"提货单列表"
            //
            // }
            // TwoPicOrder,
          ]
        },{
          "title":"财务管理",
          "icon":"appstore",
          "children":[
            // {
            //   // "url":this.setOaUrl(balance),
            //   // "target":"_blank",
            //   // "name":"余额查询"
            // },
            ThreeBalance,
            // {
            //   // "url":this.setOaUrl(checkBalance),
            //   // "target":"_blank",
            //   // "name":"对账单查询"
            // },
            FourCheckBalance,
            // {
            //   // "url":(SITE_CODE === "ezz168" ? ezzInBalance : this.setOaUrl(inBalance)),
            //   // "target":"_blank",
            //   // "name":"入账申请"
            //   "url":"/user/form",
            //   "id":paramsUrl === "/user/form",
            //   "name":"入账申请"
            // }
            FiveezzInBalance,
            // ,{
            //   "url":this.setOaUrl(returnGoods),
            //   "target":"_blank",
            //   "name":"退货申请"
            // },
          ]
        },
        // {
        //   "title":"产品查询",
        //   "icon":"inbox",
        //   "children":[
        //     // {
        //     //   "url":this.setOaUrl(checkGoods),
        //     //   "target":"_blank",
        //     //   "name":"货物查询"
        //     //   // "url":"/user/checkAll",
        //     //   // "id":paramsUrl === "/user/checkAll",
        //     //   // "name":"货物查询"
        //     //
        //     // },{
        //     //   "url":this.setOaUrl(checkSave),
        //     //   "target":"_blank",
        //     //   "name":"库存查询"
        //     // },checkGoodsPrices,
        //   ]
        // },
      ]

    }
    let zcgl = {
      "title":"众筹管理",
      "icon":"switcher",
      "children":[
        {
          // "url":this.setOaUrl("8600071"),
          // "target":"_blank",
          // "name":"提货通知单"
          "url":"/user/crowdfund",
          "id":paramsUrl === "/user/crowdfund",
          "name":"提货通知单"
        },
        // {
        //   "url":this.setOaUrl("8600037"),
        //   "target":"_blank",
        //   "name":"认筹对账单"
        // },
        // {
        //   // "url":this.setOaUrl("8600038"),
        //   // "target":"_blank",
        //   // "name":"进销存查询"
        //   "url":"/user/JinXiaoCunSearch",
        //   "id":paramsUrl === "/user/JinXiaoCunSearch",
        //   "name":"进销存查询"
        // },
        // {
        //   "url":this.setOaUrl("8600082"),
        //   "target":"_blank",
        //   "name":"贷款还款列表"
        // },{
        //   "url":this.setOaUrl("8600039"),
        //   "target":"_blank",
        //   "name":"贷款申请"
        // },
      ]
    }
    if(b2bSite.indexOf(SITE_CODE) != "-1") sidebar = sidebar.concat(commonSidebar)
    // //添加众筹管理导航
    {SITE_CODE ==="51etm" || SITE_CODE === "51exc"? sidebar.push(zcgl):""}
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
                  <Route exact path="/user/sonAccount" component={SonAccountPage} />
                  <Route exact path="/user/sonAccountEdit" component={SonAccountEditPage} />
                  <Route exact path="/user/orderList" component={OrderListPage} />
                  <Route exact path="/user/perOrderList" component={PerOrderListPage} />
                  <Route exact path="/user/perOrderDetail" component={PerOrderDetailPage} />
                  <Route exact path="/user/financial" component={FinancialPage} />
                  <Route exact path="/user/priceDetail" component={PriceDetail} />
                  <Route exact path="/user/inBalances" component={InBalances} />
                  {/*<Route exact path="/user/checkAll" component={CheckAllPage} />*/}
                  <Route exact path="/user/crowdfund" component={CrowdfundPage} />
                  <Route exact path="/user/JinXiaoCunSearch" component={JinXiaoCunSearchPage} />
                  //临时提示
                  <Route exact path="/user/form" component={Form} />
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
  customer_no: makeSelectCustomerNo(),
  username2: makeSelectUserName2()
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
