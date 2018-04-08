/**
 *
 * Menu
 *
 */

import React from 'react';
import { Menu, Dropdown } from 'antd';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
import styled from 'styled-components';
import icGo from 'images/menu/go.png';
import {Link} from 'react-router-dom';
import {getCategory, getNavbar} from "../../utils/service";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import {connect} from "react-redux";
import {
  makeSelectCategory, makeSelectSiteCode, makeSelectNavbar,
  makeSelectWarehouse
} from "../../containers/App/selectors";
import {updateCategoryAction,updateNavbarAction} from "../../containers/App/actions";
import {SITE_CODE} from "../../utils/serverUrl.js"


function getBackgroundColor(SITE_CODE) {
  switch (SITE_CODE){
    default:
    case "51etm":
      return {backgroundColor: "#c52341",hoverColor: "#E48996"};
    case "97ejk":
    case  "like_peach":
      return {backgroundColor: "#412517",hoverColor: "#a86f4f"};
    case "51exc":
      return {backgroundColor: "#278976",hoverColor: "#34AC95"};
    case "kiki":
      return {backgroundColor: "#595656",hoverColor: "#999"};
    case "51ecg":
      return {backgroundColor: "#84a93d",hoverColor: "#d5e459"};
    case "97efx":
      return {backgroundColor: "#ecb736",hoverColor: "#ffd672"};
    case "ezz168":
      return {backgroundColor: "#81c13d",hoverColor: "#9fcc66"};
    case "168ezc":
      return {backgroundColor: "#37aab3",hoverColor: "#65c2c9"};
    case "maqiduo":
      return {backgroundColor: "#1065af",hoverColor: "#4093dc"};
    case "lola_ceramics":
      return {backgroundColor: "#2a1608",hoverColor: "#fdb811"};
  }
}

const TabBackground = styled.div`
  display: block;
  background: ${getBackgroundColor(SITE_CODE).backgroundColor} ;
  justify-content: center;
`;

const TabContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  width: 1200px;
  `;

//导航菜单项
const TabItem = styled(Link)`
  display: flex;
  text-decoration: none;
  padding: 0 30px;
  line-height: 2.5;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  background-color:rgba(255, 255, 255, 0);
  transition-duration: 0.2s;
  transition-property: background-color;
  &:hover,&:active{
      //background-color:rgba(255, 255, 255, 0.5);
        background-color: ${getBackgroundColor(SITE_CODE).hoverColor};
        color: #fff; 
  }
  `;
const TabItemOuter=styled.a`
  display: flex;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  background-color:rgba(255, 255, 255, 0);
  transition-duration: 0.2s;
  transition-property: background-color;
  &:hover,&:active {
      //background-color:rgba(255, 255, 255, 0.5); 
      background-color: ${getBackgroundColor(SITE_CODE).hoverColor};
      color: #fff;
      
  }
`
//导航菜单项
const Home = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  line-height:2.5;
  padding: 0;
  justify-content: center;
  position: relative;
  `;
//导航菜单项
const Small = styled.span`
  font-size: 5px;
  `;

const HiddenPanel = styled.div`
  width: 1200px;
  font-weight:100;
  z-index: 9; 
  position: absolute;
  left: 0;
  top: 45px;
  display: flex;
  
  `;
const MenuLeft = styled.div`
  width: 150px; 
  flex-direction: column;
  top: 45px;
  //background-color: rgb(197,34,66);
  background: ${getBackgroundColor(SITE_CODE).backgroundColor} ;
  display: flex;
  
  `;
const MenuRight = styled.div`
  flex: 1;
  cursor: default;
  background: white;
  `;
const Menu1st = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  padding:0 0 0 30px;
  &:hover,&:focus,&:active {
      //background-color:rgba(255, 255, 255, 0.5); 
      background-color: ${getBackgroundColor(SITE_CODE).hoverColor};
      color: #fff;
  }
  `;

function Menu2nd(props) {
  const Menus = styled(Link)`
    display: flex;
    width: 120px;
    cursor: pointer;
    align-items: center;
    padding:0 0 0 15px;
    text-decoration: none;
    font-size: 15px;
    color: #ff1e00;
    &:hover,&:focus,&:active {
        background-color:rgba(200, 200, 200, 0.5);
        color: #CE4849;
    }
    img{
     margin-left: 8px;
    }
  `;
  return <Menus {...props}>{props.title}<img src={icGo}/></Menus>
}

const Menu23Container = styled.div`
    display: flex;
  `;

const Menu3rd = styled(Link)`
    display: flex;
     padding:0 10px ;
     text-decoration: none;
     font-size: 15px;
     color: #af9ca8;
      cursor: pointer;
      &:hover,&:focus,&:active {
        //background-color:rgba(200, 200, 200, 0.5); 
        color: ${getBackgroundColor(SITE_CODE).hoverColor};
    }
  `;

const Span = styled.span`
  padding: 9px 30px;
`;

const MenuDiv = styled.div`
  .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
    background: ${getBackgroundColor(SITE_CODE).backgroundColor};
    margin-top: -4px;
    color: #fff;
    border-right: none;
    .ant-menu-item{
      margin: 0;
     a{
      color: #fff
     };
     &:hover,&focus,&:active{
        background: ${getBackgroundColor(SITE_CODE).hoverColor};
        color: #fff;
     }
    }
    .ant-menu-submenu, .ant-menu-submenu-vertical{
      a{
      }
      &:hover,&focus,&:active{
        background: #E692A2;
        color: #fff;

     }
    }
   .ant-menu-submenu-popup {
    position: absolute;
    border-radius: 4px;
    z-index: 1050;
    padding-left: -2px;
    margin-left: -4px;
    }
  }
   
`;
const DDD = styled.div`
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.5) ;
`;

function MenuItemlist(props){
  const navbar = props.children;
  if(navbar === undefined){return ""};
  const listItems = navbar.map(item=>
    <MenuItem key={item.id}><a href={item.link_url}>{item.name}</a></MenuItem>
  )
  return (
    <MenuDiv>
      <Menu>
        {listItems}
        {/*<SubMenu title="sub menu">
          <MenuItem>3rd menu item</MenuItem>
          <MenuItem>4th menu item</MenuItem>
        </SubMenu>*/}
      </Menu>
    </MenuDiv>
  );
}

function MenuList(item){
  const menulist = MenuItemlist(item);
  if(menulist == ""){
    return <Span>{item.name}</Span>
  }else{
  return (
    <Dropdown overlay={menulist} placement="bottomCenter">
      <Span>{item.name}</Span>
    </Dropdown>
  )
  }
}

class Menus extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super();
    this.state = {
      shouldShowMenu: false,
      checkedCategory: 0,//选中的分类下标
      shouldShowMenuNew: false
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.site_code!==this.props.site_code){
      this.loadNavbar(nextProps.site_code);
      this.loadCategory(nextProps.site_code);
    }
  }

  loadNavbar(site_code){
    getNavbar(site_code).then(data=>{
      if (data.code !== 1) throw '获取分类数据出错';
      let navList=data.data;
      this.props.dispatch(updateNavbarAction(navList));
    }).catch(e=>{
      console.error('获取导航栏出错',e);
    })
  }

  loadCategory(site_code){
    getCategory(site_code).then(data=>{
      if (data.code !== 1) throw '获取分类数据出错';
      this.props.dispatch(updateCategoryAction(data.data));

    }).catch(e=>{
      console.error('分类加载出错',e);
    });
  }

  componentDidMount() {
      this.loadNavbar(this.props.site_code);
      this.loadCategory(this.props.site_code);
  }

  get1stList() {
    return this.props.category.map((item, index) => {
      return <Menu1st to={`/productList?category=${item.name}`}  key={item.name} onClick={e => {
        this.changeMenuVisibility(false);
      }} onMouseEnter={e => this.setState({checkedCategory: index})}>{item.name}</Menu1st>
    })
  }

  get2ndList() {
    let index = this.state.checkedCategory;
    let subCategory = this.props.category[index].children;
    if (subCategory) {
      return subCategory.map(item => {
        return (
          <Menu23Container key={item.name}>
            <Menu2nd title={item.name} to={`/productList?category=${item.name}`} onClick={e => {
              this.changeMenuVisibility(false);
            }}/>
            {item.children && this.get3rdList(item.children)}
          </Menu23Container>
        )
      })
    }

  }

  get3rdList(subCategory) {
    return subCategory.map(item => {
      return <Menu3rd to={`/productList?category=${item.name}`} key={item.name} onClick={e => {
        this.changeMenuVisibility(false);
      }}>{item.name}</Menu3rd>
    });
  }

  changeMenuVisibility(shouldShowMenu) {
    this.setState({
      shouldShowMenu: shouldShowMenu
    })
  }




  render() {
    const navbarList=this.props.navbar&&this.props.navbar.map(item=>{
      const url= item.link_url;
      return <TabItemOuter key={item.id} href={url} target="_blank">
              {MenuList(item)}
             </TabItemOuter>
    });


    return (
      <TabBackground>
        <TabContainer>
         {SITE_CODE !== "97ejk" && <TabItem to='/'>首页</TabItem>}
         {
           SITE_CODE !== "97ejk" ? <Home onMouseEnter={e => this.changeMenuVisibility(true)}
                                         onMouseLeave={e => this.changeMenuVisibility(false)}>
             产品馆&nbsp;&nbsp;
             <Small>▼</Small>
             {this.state.shouldShowMenu && this.props.category&&this.props.category.length > 0 && (
               <HiddenPanel>
                 <MenuLeft>
                   {this.get1stList()}
                 </MenuLeft>
                 <MenuRight>
                   {this.get2ndList()}
                 </MenuRight>
               </HiddenPanel>
             )}
           </Home> : ""
         }

          {navbarList}
        </TabContainer>
      </TabBackground>
    );
  }
}

Menus.propTypes = {};

const mapStateToProps = createStructuredSelector({
  site_code: makeSelectSiteCode(),
  category: makeSelectCategory(),
  navbar: makeSelectNavbar(),
  warehouse: makeSelectWarehouse()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Menus);
