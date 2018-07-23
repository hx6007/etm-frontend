/**
*
* Collect
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CollectItem from '../../components/CollectItem/index';
import {addCart, delProductFavorite, getProductDetail, getProductFavoriteList, getUserInfo} from "../../utils/service";
import connect from "react-redux/es/connect/connect";
import {
  makeSelectProductHalls,
  makeSelectSiteCode, makeSelectUserId, makeSelectUserIsValidate,
  makeSelectUserLevel, makeSelectUserName2, makeSelectUserType
} from "../../containers/App/selectors";
import {createStructuredSelector} from 'reselect';
import compose from "redux/es/compose";
import {parseProduct} from "../../containers/ProductDetailPage/productConverter";
import Link from "react-router-dom/es/Link";
import {SITE_CODE} from "../../utils/serverUrl";

const NoGoods = styled.div`
    display:flex;
    width:100%;
    height:400px;
    margin:20px auto;
    margin-top:100px;
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
const DataLoad = styled.p`
  font-size:18px;
  color:#666;
  text-align:center;
  margin:120px auto;
 display:${props => props.show? 'block' : 'none'};
`;
export class Collect extends React.Component {
  constructor(props) {
    super();
    this.state = {
      collectList: [],
      status:true
    };
    if(!props.user_id){
      props.history.goBack();
      alert('您尚未登录！');
      return;
    }
  }
  componentDidMount(){
    this.getCollect();
  }
  //获取收藏列表
  getCollect() {
    const {user_id, siteCode}=this.props;
    getProductFavoriteList(siteCode,user_id).then( data =>{
      console.log("getProductFavoriteList",data)
      if (data.code !== 1)throw '服务器数据错误';
      let productList = [];
      for (let item of data.data) {
        productList.push({
          id: item.sku_id,
          collectId:item.collect_id,
          warehouse: item.warehouse
        });
      }
      this.loadSingleProduct(productList);
    }).catch( error => {console.log("error",error)}).then(e=>{
      this.setState({
        status:false
      })
    })
  }
  //逐个获取商品信息
  loadSingleProduct(productList){
    if (productList.length < 1)return;
    let productId = productList[0].id;
    let collectId = productList[0].collectId;
    let warehouse = productList[0].warehouse;
    const {user_id,siteCode,is_validate,product_hall_id,userLevel,userType} =this.props;
    let getParams = {
      "siteCode": userType,
      "sku_id":productId,
      "userLevel": userLevel,
    }
    console.log(getParams)
    getProductDetail(getParams).then(data => {
      console.log("getProductDetail",data)
      if (data.code !== 1)throw '服务器数据错误';
      let product = parseProduct(data.data, productId,warehouse,userLevel);
      product.collectId = collectId;
      let collectList = this.state.collectList;
      collectList.push(product);
      this.setState({collectList: collectList});
    }).catch(e => {
      console.error('读取商品数据失败',e.toString())
    }).then(()=>{
      //递归查询购物车列表
      productList.shift();
      this.loadSingleProduct(productList);
    }).then(e=>{
      this.setState({
        status:false
      })
    })
  }
  //移除收藏
  removeCollect(collectid){
    delProductFavorite(collectid).then(data => {
      console.log(data);
      if(data.code !== 1){
        alert("服务器出错，请稍后重试！");
        return
      }
      alert("移除收藏成功！");
      this.setState({collectList: []});
      this.getCollect();
    }).catch( error => {
      alert(error+",请稍后重试!");
    })

  }
 //加购
  addCart(index,collectid){
    let product = this.state.collectList[index];
    const count = 1;
    const {siteCode, user_id} = this.props;
    console.log(product);
    if(!user_id){
      history.push('/login');
      alert('请先登录');
    }else if(product.userPrice<=0){   //与商品详情页面不同的价格对比
      alert('该商品没有价格，无法购买，请联系客服');
    }else {
      let params = {
        "site_code" : siteCode,
        "user_id" : user_id,
        "sku_id" : product.id,
        "warehouse" : product.warehouse,
        "count" : count,
        "username2": this.props.username2
      }
      addCart(params).then(data => {
        if(data.code !== 1) throw data;
        this.removeCollect(collectid);
        alert("加入购物车成功");
      }).catch(e => {
        console.log(e);
        alert("加入购物车失败")
      })
    }
  }
  render() {
    let collecList = this.state.collectList.map((item,index) =>
      <CollectItem key={item.collectId+"collect"+item.sku_id+index} index={index} {...item} userLevel = {this.props.userLevel}
                   username2={this.props.username2}
                   removeCollect={(collectid) =>this.removeCollect(collectid) }
                   addCart = {(index,collectid) =>this.addCart(index,collectid) }
      ></CollectItem>
    );
    return (
      <div>
        {collecList}
        <DataLoad show={this.state.status}>数据加载中...请稍等...</DataLoad>
        {!this.state.status && this.state.collectList<1&&(
          <NoGoods><NoTips>您还没有收藏商品哦</NoTips><Toindex to='/'>去首页</Toindex></NoGoods>
        )}
      </div>
    );
  }
}

Collect.propTypes = {

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
const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(Collect);
