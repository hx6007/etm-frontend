/**
 *
 * ProductDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProductDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import HtmlTitle from '../../components/HtmlTitle/index';
import MainBottom from "../../components/MainBottom";
import MainHead from "../../components/MainHead";
import {Content} from "./Content";
import {parseProduct} from "./productConverter";
import {makeSelectUserLevel,makeSelectWarehouse,makeSelectSiteCode,makeSelectUserIsValidate,makeSelectUserId} from "containers/App/selectors";
import {addCart, addProductFavorite, getProductDetail, login} from "../../utils/service";
import {Body, HorizontalLayout, VerticalLayout} from "../../components/Layout";
import styled from "styled-components";
import {Link} from "react-router-dom";
import next from 'images/next.png';
import GetPlatform from "../../components/GetPlatform";
import {signOutAction} from "../App/actions";
import {SITE_CODE} from "../../utils/serverUrl";
import {makeSelectUserName2, makeSelectUserType} from "../App/selectors";

const ImageList = styled(VerticalLayout)`
  margin-top: 50px;
  `;

const ProHead = styled.div`
  padding-top: 25px;
  color: #999999;
  font-size: 18px;
`;

const ProductIntroduce = styled(HorizontalLayout)`
  height: 60px;
  background: #E9E9E9;
  border: 1px solid #ccc;
  color: #746B66;
`;

const ProductIntroduceSpan = styled.span`
  background: ${props => props.checked ? '#fff' : '#E9E9E9'};
  border-right: ${props => props.checked ? '1px solid #ccc' : ''};
  border-bottom: ${props => props.checked ? '1px solid #fff' : ''};
  border-left: ${props => props.checked ? '1px solid #ccc' : ''};
  width: 150px;
  height: 59px;
  text-align: center;
  padding-top: 15px;
`;


const PerImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  display: block;
`;
const ImageDe = styled.div`
  padding: 50px 0;
`;

const BuyKnow = styled.div`
  padding: 30px;
`;


const DetailDiv = styled(HorizontalLayout)`
  justify-content: space-around;
  margin: 30px 0;
`;
const DDiv = styled(VerticalLayout)`
`;
const NextImage = styled.img`
  width: 20px;
  height: 20px;
  margin:0 10px;
`;
const A = styled(Link)`
  color: #999999;
  font-size: 16px;
  text-decoration: none;
  padding-left: 3px;
`;

export class ProductDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = {
      checkTab:1,
      product:{},
      //非会员0，会员1，白金价2
      // is_validate: 0,
    };
    this.loadData(props);
    this.getUserLevels(props);
  }
  loadData(props=this.props){
    const sku_id = props.match.params.productId;
    //用户等级 用于判断价格 warehouse仓库 siteCode平台代码
    const {userLevel,warehouse,siteCode,is_validate,userType}=props;
    let getParams = {
      siteCode: userType,
      sku_id: sku_id,
      userLevel: userLevel
    }
    getProductDetail(getParams).then(data => {
      console.log("getProductDetail",data);
      if (data.code !== 1)throw '服务器数据错误';
      const product=parseProduct(data.data,sku_id,warehouse,userLevel);
      this.setState({
        product:product,
      })
    }).catch(e => {
      console.log(e);
      alert('加载失败，请重试或联系相关人员')
    })
  }
  render() {
    const platform = GetPlatform();
    const product=this.state.product;
    return (
      <div>
        <HtmlTitle title={product.title|| platform.name + " - 商品详情"} />
        <MainHead />
        <Body>
        {(JSON.stringify(product) != "{}") && <div>
          <ProHead>
            <A to="/">首页</A>
            <NextImage src={next}/>
            <A to={`/productList?category=${product.MatGroup1}`}>{product.MatGroup1}</A>
            <NextImage src={next}/>
            <A to="#">{product.title}</A>
          </ProHead>
          <Content username2 ={this.props.username2} product={product} userLevel={this.props.userLevel} buyNow={this.buyNow} addToCart={this.addToCart} updateCount={this.updateCount} addCollect={this.addCollect}/>
          <ImageList>
            <ProductIntroduce>
              <ProductIntroduceSpan checked={this.state.checkTab===1} onClick={e => this.setState({checkTab: 1}) }>商品详情</ProductIntroduceSpan>
              <ProductIntroduceSpan checked={this.state.checkTab===2} onClick={e => this.setState({checkTab: 2}) }>购买须知</ProductIntroduceSpan>
              <ProductIntroduceSpan checked={this.state.checkTab===3} onClick={e => this.setState({checkTab: 3}) }>常见问题</ProductIntroduceSpan>
            </ProductIntroduce>
            {this.getCurrentTab(this.state.checkTab)}
          </ImageList>
        </div>}
        </Body>

        <MainBottom />
      </div>
    );
  }

  getCurrentTab(index){
    switch (index){
      default:
      case 1:
        return this.getDetailTab(this.state.product);
      case 2:
        return <BuyKnow> {this.state.product.direction}</BuyKnow>;
      case 3:
        return <BuyKnow> {this.state.product.questions}</BuyKnow>;
    }
  }
    getDetailTab(props){
      return  props.detail&&props.detail.length>0 ?
      <ImageDe> {props.detail && props.detail.map((item, index) => <PerImage key={index} src={item} alt={props.title}/>)}</ImageDe> :
      <DDiv>
        <DetailDiv>
        <span>品牌：{props.brand}</span>
        <span>产品编号：{props.product_no}</span>
        <span>形状：{props.shape}</span>
        <span>产品尺寸：{props.spec}</span>
        </DetailDiv>
        <DetailDiv>
        <span>色号：{props.color}</span>
        <span>表面处理：{props.Technology}</span>
        <span>边处理：{props.rim_category}</span>
        <span>材质：{props.Texture}</span>
        </DetailDiv>
      </DDiv>;
  }

  /**
   * 更新购买数量
   * @param newCount
   */
  updateCount=(newCount)=>{
    newCount=parseInt(newCount);
    if(newCount>0){
      let product=this.state.product;
      product.count=newCount;
      this.setState({product:product});
    }
  };


  getUserLevels(props){
    const product = this.state.product;
    //商城价
    const priceFace = product.priceFace;
    //会员价
    const price = product.price;
    //vip价
    const priceVip = product.priceVip;
    //白金价
    const goldPrice = product.goldPrice;
    switch (props.userLevel){
      default:
      case 0:
        return priceFace;
      case 1:
        return price;
      case 2:
        return priceVip;
      case 3:
        return goldPrice;
    }

  }


//立即购买
  buyNow=()=>{
    const currentPrice = this.getUserLevels(this.props)
    const product=this.state.product;
    const {userLevel,history,username2}=this.props;
    let priceOrVip = (SITE_CODE === "ezz168" || SITE_CODE === "97efx") && username2 ===null || username2 ===undefined;
    if(userLevel===0){
      history.push('/login');
      alert('请先登录');
    }else if(priceOrVip ? product.userPrice<=0: currentPrice<=0){
      alert('该商品没有价格，无法购买，请联系客服');
    }else {
      history.push('/orderSubmit',{productList:[{...product}]})
    }
  };

  /**
   * 加入购物车
   * @param product
   */
  addToCart=()=>{
    const product=this.state.product;
    const {siteCode, user_id, history, username2} = this.props;
    const currentPrice = this.getUserLevels(this.props)
    let priceOrVip = (SITE_CODE === "ezz168" || SITE_CODE === "97efx") && username2 ===null || username2 ===undefined;
    if(!user_id){
      history.push('/login');
      alert('请先登录');
    }else if( priceOrVip ? product.userPrice<=0: currentPrice<=0){
      alert('该商品没有价格，无法购买，请联系客服');
    }else {
      let params = {
        "site_code" : siteCode,
        "user_id" : user_id,
        "sku_id" : product.id,
        "warehouse" : product.warehouse,
        "count" : product.count,
        "username2": this.props.username2
      }
      addCart(params).then(data => {
        if(data.code!==1){
          if(data.code == 8){
            this.props.signOut();
            alert("登录失效，请重新登录");
            this.props.history.push('/login');
            return;
          }
          throw data
        };

        alert("加入购物车成功")
      }).catch(e => {
        console.log(e);
        alert("加入购物车失败")
      })
    }
  };
  addCollect=()=>{
    const {history, user_id,siteCode} = this.props;
    if(!user_id){
      history.push('/login');
      alert("请先登录");
      return;
    }
    addProductFavorite(siteCode, user_id, this.state.product.id).then(data => {
      if (data.code !== 1)throw '服务器数据错误';
      alert("收藏成功")
    }).catch(e => {
      console.log(e);
      alert("收藏失败")
    })
  };
}

ProductDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  productdetailpage: makeSelectProductDetailPage(),
  userLevel: makeSelectUserLevel(),
  warehouse: makeSelectWarehouse(),
  siteCode: makeSelectSiteCode(),
  is_validate: makeSelectUserIsValidate(),
  user_id: makeSelectUserId(),
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

const withReducer = injectReducer({ key: 'productDetailPage', reducer });
const withSaga = injectSaga({ key: 'productDetailPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductDetailPage);
