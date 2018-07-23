/**
 *
 * CartPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import nogoodsImg from './nogoods.png'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCartPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import CartItem from "../../components/CartItem/index";
import styled from 'styled-components';
import HtmlTitle from "../../components/HtmlTitle";
import MainHead from '../../components/MainHead';
import MainBottom from '../../components/MainBottom';
import {Link} from 'react-router-dom';
import {
  getCart, updateCart, addCart, getUserInfo, delCart, addProductFavorite,
  getProductDetail
} from "../../utils/service";
import {
  makeSelectUserId, makeSelectSiteCode, makeSelectUserIsValidate, makeSelectProductHalls,
  makeSelectUserLevel, makeSelectUserType, makeSelectUserName2
} from "../App/selectors";
import {parseProduct} from "../ProductDetailPage/productConverter";
import {signOutAction} from "../App/actions";
import {SITE_CODE} from "../../utils/serverUrl";

const NoGoods = styled.div`
    display:flex;
    width:1200px;
    height:400px;
    margin:20px auto;
    flex-direction: column;
`;
const NoGoodsimg = styled.img`
  width:200px;
  height:200px;
  margin:0 auto;
  margin-bottom:50px;
`;
const NoTips = styled.p`
  font-size:20px;
  color:#333;
  text-align:center;
`;
const Toindex = styled(Link)`
  font-size:20px;
  text-align:center;
`;
const Table = styled.table`
  width:1200px;
  margin:20px auto;
`;
const PageTitle = styled.h3`
  width:1200px;
  margin:30px auto;
  font-size:24px;
  color:#666666;
  text-align: center;
`;
const Tbody = styled.tbody`
	color: #4C5D76;
	background: #fff;
`;
const Thead = styled.thead`
  line-height:50px;
	color: #4C5D76;
	background: #e5e5e5;
	text-align: left;
`;
const Th = styled.th`
  padding-left:10px;
`;
const CheckBox = styled.input`
  margin-right:8px;
  width: 15px;
  height: 15px;
  vertical-align: text-top;
`;
const Account = styled.div`
  display:flex;
  flex-direction:row-reverse;
  width:1200px;
  height:50px;
  margin:20px auto;
  background:#e5e5e5;
`;
const Settle = styled.span`
   width:100px;
   height:50px;
   line-height:50px;
   font-size:20px;
   color:#fff;
   text-align:center;
   background:${props => props.active ? 'rgb(197,34,66)' : "#B0B0B0"};
`;
const TotalText = styled.span`
    height:50px;
    padding:0 10px;
    line-height:50px;
    font-size:12px;
    color:#3c3c3c;
`;
const Total = styled.i`
    height:50px;
    margin:0 10px;
    line-height:50px;
    font-size:20px;
    font-style: normal;
    // vertical-align: sub;
    color:rgb(197,34,66);
`;
const Alldel = styled.div`
    float:left;
    height:50px;
    padding:0 10px;
    line-height:50px;
    font-size:12px;
    color:#3c3c3c;
    flex:1;
`;
const Linkdel = styled.i`
    height:50px;
    margin:0 20px;
    line-height:50px;
    font-size:12px;
    color:#3c3c3c;
    font-style: normal;
`;
const DataLoad = styled.p`
  font-size:18px;
  color:#666;
  text-align:center;
  margin:120px auto;
 display:${props => props.show? 'block' : 'none'};
`;

export class CartPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super();
    //初始化数据
    this.state = {
      cartList : [
        //     id: 1,//商品ID
        //     cartId: 1,//购物车项ID
        //     image: '',//商品图片
        //     title: '',//商品标题
        //     price: 0.00,//价格
        //     quantity: 1,//当前数量
        //      location:'',//发货地
        //      warehouse: '',//仓库
        //     checked: true//选中状态
      ], //{id,cartId,image,title,location,price,warehouse,quantity,checked}
      status:false, //记载数据状态
      del:true     //记录是否可以点击删除
    };
    if(!props.user_id){
      props.history.push('/login');
      alert('您尚未登录！');
      return;
    }
  }
  componentDidMount(){
    this.getWebCart();

  }
  //全选
  checkAll(){
    let cartList = this.state.cartList;
    for (let item of cartList) {
      item.checked = true;
    }
    this.setState({cartList: cartList});
  }
  // 取消全选
  uncheckAll(){
    let cartList = this.state.cartList;
    for (let item of cartList) {
      item.checked = false;
    }
    this.setState({cartList: cartList});
  }
  //选中
  checkItem(index){
    let cartList=this.state.cartList;
    cartList[index].checked=true;
    this.setState({
      cartList:cartList
    });
  }
  //取消选中
  uncheckItem(index){
    let cartList=this.state.cartList;
    cartList[index].checked=false;
    this.setState({
      cartList:cartList
    });
  }
  //重现计算选中的列表
  calculateCheckList(){
    let totalCount = 0;//总价
    let checkedList = [];
    for (let item of this.state.cartList) {
      if (item.checked) {
        totalCount += parseFloat(item.price) * parseInt(item.quantity);
        checkedList.push(item);
      }
    }
    totalCount = parseFloat(totalCount).toFixed(2);
    this.setState({checkedList: checkedList, total: totalCount});
  }
  //数量改变
  handleQuantityChange(index,quantity,cartid){
    quantity=parseInt(quantity);
    if (quantity<1){
      return;
    }
    updateCart(cartid,quantity,this.username2).then(data => {
      if (data.code === 1){
        let cartList=this.state.cartList;
        cartList[index].count=quantity;
        this.setState({
          cartList:cartList
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }
  //删除列表
  removeItem = (index,cartId,showw) => {
    delCart(cartId).then(data => {
      if(data.code === 1){
        const cartList = this.state.cartList;
        cartList.splice(index,1);
        this.setState({cartList: cartList});
        if (showw){
          alert("移入收藏成功！");
          return ;
        }
        alert("删除成功！");
      }else {
        console.log(data);
        throw data;
      }
    }).catch(error => { console.error("删除失败！",error)})
  };
  //删除商品
  delall() {
    if (!this.state.del){
      return ;
    }
    let removeList = [];
    for(let goods of this.state.cartList){
      if(goods.checked){
        removeList.push(goods.cartId);
      }
    }
    if(removeList.length === 0){
      return ;
    }
    this.setState({del:false});
    delCart(removeList.toString()).then( data => {
      if(data.code === 1){
        alert("删除成功！");
        this.getWebCart();
        this.setState({del:true});
      }else {
        console.log(data);
        throw data;
      }
    }).catch(error => {console.log(error);this.setState({del:true})});

  }
  // 获取网络购物车
  getWebCart(){
    this.setState({
      status:true
    });
    const {user_id,siteCode,is_validate,product_hall_id,username2} =this.props;
    getCart(siteCode,user_id,username2).then(data => {
      this.setState({cartList: []});
      if(data.code == 6){
        return;
      }
      if (data.code !== 1){
        if(data.code == 8){
          this.props.signOut();
          alert("登录失效，请重新登录");
          this.props.history.push('/login');
          return;
        };
        throw '服务器数据错误' + data.message;
      }
      this.setState({del:true});
      let productList = [];
      for (let item of data.data) {
        productList.push({
          id: item.sku_id,
          cartId:item.id,
          quantity: item.count,
          warehouse: item.warehouse
        });
      }
      this.loadSingleProduct(productList);
    }).catch(e => {
      console.error('获取购物车失败',e.toString())
    }).then(e=>{
      this.setState({
        status:false
      })
    })
  }
  //逐个获取商品信息
  loadSingleProduct(productList){
    if (productList.length < 1)return;
    let productId = productList[0].id;
    let cartId = productList[0].cartId;
    let quantity = productList[0].quantity;
    let warehouse = productList[0].warehouse;
    const {user_id,siteCode,is_validate,product_hall_id,userLevel,userType} =this.props;
    let getParams = {
      "siteCode": userType,
      "sku_id":productId,
      "userLevel": userLevel,
    }
    getProductDetail(getParams).then(data => {
      console.log("getProductDetail",data)
      if (data.code !== 1){
        if(data.code == 8){
          this.props.signOut();
          alert("登录失效，请重新登录");
          this.props.history.push('/login');
          return;
        };
        throw '服务器数据错误';
      }
      let product = parseProduct(data.data, productId,warehouse,userLevel);

      let item = {
        ...product,
        cartId:cartId,
        count:quantity,
        checked: true//选中状态

      };
      let cartList = this.state.cartList;
      cartList.push(item);
      this.setState({cartList: cartList});
    }).catch(e => {
      console.error('读取商品数据失败',e.toString())
    }).then(()=>{
      //递归查询购物车列表
      productList.shift();
      this.loadSingleProduct(productList);
    })

  }

  //移入收藏
  addToCollect = (sku_id,index,cartId) => {
    const {user_id,siteCode,is_validate,product_hall_id} =this.props;
    addProductFavorite(siteCode,user_id,sku_id).then(data => {
      if(data.code===1) {
        this.removeItem(index,cartId,1);
      }else{
        throw data;
      }
    }).catch(error => {
      console.log("cart error => ", error);
    });
  };
  //提交订单
  toBuy = () => {
    const productList = this.state.cartList.filter(item=>item.checked);
    this.props.history.push({
      pathname: '/orderSubmit',
      state: {
        productList:productList,
      }
    })
  };
  render() {
    // {id,cartId,image,title,location,price,warehouse,quantity,checked}
    const list = this.state.cartList.map((item,index) =>
      <CartItem index={index} key={item.id+''+index} {...item}
                removeItem = {(idx,cartId)=>this.removeItem(idx,cartId)}
                username2 = {this.props.username2}
                checkItem={idx=>this.checkItem(idx)}
                uncheckItem={idx=>this.uncheckItem(idx)}
                handleQuantityChange={(idx,quantity,cartid)=>this.handleQuantityChange(idx,quantity,cartid)}
                addToCollect = {(skd,ind,id) => {this.addToCollect(skd,ind,id)}} />
    );
    let totalPrice=0;
    let checkedCount=0;
    for (const item of this.state.cartList){
      if(item.checked){
        checkedCount++;
        if(this.props.username2 !== null && this.props.username2 !== undefined){
          totalPrice+=parseInt(item.count)*parseFloat(item.priceFace);
        }else {
          totalPrice+=parseInt(item.count)*parseFloat(item.userPrice);
        }
      }
    }
    totalPrice=totalPrice.toFixed(2);
    return (
      <div>
        <HtmlTitle />
        <MainHead />
        <PageTitle>我的购物车</PageTitle>
          <Table>
            <Thead>
              <tr>
                <Th><CheckBox type="checkbox" onClick={e => {
                  if(this.state.cartList.length===checkedCount){
                    this.uncheckAll()
                  }else {
                    this.checkAll()
                  }
                }}   checked={
                  this.state.cartList.length===checkedCount} onChange={e => {}} />全选</Th>
                <Th>商品信息</Th>
                <Th>单价（元）</Th>
                <Th>数量</Th>
                <Th>小计</Th>
                <Th>操作</Th>
              </tr>
            </Thead>
            <Tbody id="ss">
              {list}
            </Tbody>
          </Table>
        <DataLoad show={this.state.status}>数据加载中...请稍等...</DataLoad>
        {!this.state.status&&this.state.cartList.length<1&&(
          <NoGoods><NoGoodsimg src={nogoodsImg} alt=""/> <NoTips>您还没有选购商品哦</NoTips><Toindex to='/'>去首页</Toindex></NoGoods>
        )}
        <Account>

          <Settle onClick={e =>{checkedCount>0 && this.toBuy() }} active = {checkedCount>0}>结算</Settle><TotalText>合计 （不含运费） ：<Total>{totalPrice}</Total>元</TotalText>
          <TotalText>已选商品<Total>{checkedCount}</Total>件</TotalText>
          <Alldel><CheckBox type="checkbox" onClick={e => {
            if(this.state.cartList.length===checkedCount){
              this.uncheckAll()
            }else {
              this.checkAll()
            }
          }}   checked={
            this.state.cartList.length===checkedCount} onChange={e => {}} />全选
            <Linkdel onClick={e => {this.delall()}}>删除</Linkdel>
          </Alldel>

        </Account>
        <MainBottom />
      </div>
    );
  }
}


CartPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user_id:makeSelectUserId(),
  siteCode: makeSelectSiteCode(),
  is_validate: makeSelectUserIsValidate(),
  userLevel: makeSelectUserLevel(),
  product_hall_id: makeSelectProductHalls(),
  userType: makeSelectUserType(),
  username2: makeSelectUserName2()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signOut:()=>dispatch(signOutAction())
  };
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(CartPage);
