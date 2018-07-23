/**
 *
 * ProductItem
 *
 */

import React from 'react';
import styled from 'styled-components';
import {VerticalLayout, HorizontalLayout} from "../../components/Layout/index";
import {createStructuredSelector} from 'reselect';
import add from 'images/add.png';
import reduce from 'images/reduce.png';
import noPic from 'images/no_pic.jpg';
import collect from 'images/productDetail/collect.png';
import Gallery from "../../components/Gallery";
import {SITE_CODE} from "../../utils/serverUrl";

const ContentBox=styled(HorizontalLayout)`
  margin-top: 15px;
`;
const Title = styled.span`
  color: #333;
  font-size: 18px;
  `;
const CountSpan = styled.div`
  border: 1px solid #666;
  width: 36px;
  height: 31px;
  font-size: 15px;
  cursor: pointer;
`;

const SmallPic = styled.img`
  width: 75px;
  height: 70px;
  border: 1px solid #FC0D1B;
  margin: 10px 0;
`;

const Price = styled(HorizontalLayout)`
  height: 60px;
  background: #F5F5F5;
  color: #6D747C;
  font-size: 18px;
  padding-left: 10px;
  margin: 10px 0;
  `;

const Span = styled.span`
  color: #FC0D1B;
  padding: 0 10px;
  font-weight: bold;
`;


const Model = styled(HorizontalLayout)`
  `;
const Specification = styled(HorizontalLayout)`
  `;

const SpecA = styled.a`
  border: 1px solid #FC0D1B;
  height: 34px;
  background: #eee;
  text-align: center;
  padding: 6px 5px 0 5px;
  color: #E4271D;
`;

const Warehouse = styled(HorizontalLayout)`
  padding-top: 20px;
  `;
const Amount = styled(HorizontalLayout)`
  padding-top: 20px;
  `;

const AddCart = styled(HorizontalLayout)`
  padding-top: 20px;
  color: #fff;
  font-size: 15px;
`;

const MainImage = styled.img`
  height: 450px;
  width: 400px;
  padding-top: 25px;
`;

const ProductionInformation = styled(VerticalLayout)`
  padding-left: 30px;
  padding-top: 16px;
`;


const AddImage = styled.img`
  width: 28px;
  height: 28px;
  color: #333;
  margin-left: 2px;
`;

const Input = styled.input`
  border: 1px solid #666;
  width: 50px;
  height: 31px;
  text-align: center;
`;


const BuyDiv = styled.div`
  background: #E4271D;
  width: 150px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  color: white;
  height: 50px;
  cursor: pointer;
  &:hover,&:active{
    opacity: 0.8;
  }
`;

const AddCarts = styled(BuyDiv)`
  background: #FFE4D2;
  margin-left: 100px;
  color: #EF522B;
  border: solid 1px #F4CAB8;
  cursor: pointer;


`;


const DeleteSpan = styled.span`
  text-decoration: line-through;
  padding: 0 10px;
`;

const WarehouseCount = styled.span`
  margin-left: 30px;
`;

const CollectImg = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 10px 0 0px;
`;

const CollectDiv = styled.div`
  padding-top: 20px;
  color: #C6C6C6;
  font-size: 15px;
  &:hover{
    color: red;
    cursor: pointer;
  }
`;
const FuturesButton = styled.button`
  border: solid #BE9478 1px;
  margin-left: 10px;
  border-radius: 3px;
  color: #BE9478;
  font-size: 13px;
`;

function getShownPrice(userLevel,product,username2){
  if(username2 === null || username2 === undefined ){
    switch (userLevel){
      default:
      case 0:
        return (
          <span>商城价：<Span>￥{product.priceFace}/{product.price_unit}</Span></span>
        );
      case 1:
        return(
          <div>
            <span>商城价：<DeleteSpan>￥{product.priceFace}/{product.price_unit}</DeleteSpan></span>
            <span>会员价：<Span>￥{product.price}/{product.price_unit}</Span></span>
          </div>
      );
      case 2:
        return (
          <div>
            <span>商城价：<DeleteSpan>￥{product.priceFace}/{product.price_unit}</DeleteSpan></span>
            <span>会员价：<DeleteSpan>￥{product.price}/{product.price_unit}</DeleteSpan></span>
            <span>vip价：<Span>￥{product.priceVip}/{product.price_unit}</Span></span>
          </div>
        );
      case 3:
        return (
          <div>
            <span>商城价：<DeleteSpan>￥{product.priceFace}/{product.price_unit}</DeleteSpan></span>
            <span>会员价：<DeleteSpan>￥{product.price}/{product.price_unit}</DeleteSpan></span>
            <span>vip价：<DeleteSpan>￥{product.priceVip}/{product.price_unit}</DeleteSpan></span>
            <span>白金价：<Span>￥{product.goldPrice}/{product.price_unit}</Span></span>
          </div>
        );
      }
  }else{
    return (
      <span>商城价：<Span>￥{product.priceFace}/{product.price_unit}</Span></span>
    );
  }
}


export const Content = ({product, userLevel, buyNow, addToCart, updateCount,addCollect,username2}) => {
  const imgUrl = product.images&&product.images[0] || noPic;
  const distinguish = "productDetail";
  //97ejk才显示期货现货筛选
  let judgeFutures = SITE_CODE === "97ejk" && product.Futures !== undefined && product.Futures === "期货";
  return (
    <ContentBox>
      <Gallery images={product.images}  distinguish={distinguish}/>
      <ProductionInformation>
        <Title>{product.title} {judgeFutures ? <FuturesButton>{product.Futures}</FuturesButton> : ""}</Title>
        <Price>
          {getShownPrice(userLevel,product,username2)}
        </Price>
        <Model>型号：<SmallPic src={imgUrl}/></Model>
        <Specification>规格：<SpecA>{product.spec}</SpecA></Specification>
        <Warehouse>仓库：{product.warehouse}</Warehouse>
        <Amount>数量：
          <CountSpan onClick={e => updateCount(product.count - 1)}>
            <AddImage src={reduce}/>
          </CountSpan>
          <Input type="number" value={product.count} onChange={()=>{}}  onInput={e => {
            let value = parseInt(e.target.value) || 1;
            updateCount(value)
          }}/>
          <CountSpan onClick={e => updateCount(product.count + 1)}>
            <AddImage src={add}/>
          </CountSpan>
          {/*<WarehouseCount>库存：999</WarehouseCount>*/}
        </Amount>
        <AddCart>
          <BuyDiv onClick={e => buyNow()}>立即购买</BuyDiv>
          <AddCarts onClick={(e) => addToCart()}>加入购物车</AddCarts>
        </AddCart>
        <CollectDiv onClick={addCollect}><CollectImg src={collect}/>收藏商品</CollectDiv>
      </ProductionInformation>
    </ContentBox>
  )
};
