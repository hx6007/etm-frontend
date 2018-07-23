/**
*
* CollectItem
*
*/

import React from 'react';
import styled from 'styled-components';
// import somi from 'images/user/somi.jpg';
import adelete from './delete.png';
import goCart from './cart.png';
import PropTypes from 'prop-types';
import nogoodsImg from '../../images/no_pic.jpg'
import Link from "react-router-dom/es/Link";

const CollectItemBox = styled.div`
  float:left;
  width:250px;
  padding:0;
  margin:20px 25px 20px 25px;
  border: 1px solid #eeeeee;
  box-shadow: 0 0 10px rgba(204,204,204,0.5);
  position:relative;

  &:hover .aaa {
    position:absolute;
    bottom:0px;
    background:rgba(0,0,0,.8);
    display:flex;
    justify-content: space-between;
    width:100%;
    padding:5px;
  }
`;
const Image = styled.img`
  width:250px;
  height:250px;
  margin:0;
  padding:0;
`;
const CollectTitle = styled.p`
  height:50px;
  margin: 12px 15px 0 15px;
  color: #333333;
  word-break: break-all;
  font-family:'微软雅黑';
`;
const Operate = styled.div`
  margin: 6px 15px 15px 15px;
`;
const Price = styled.span`
    font-size:18px;
    color: #dd250c;
`;
const PriceT = styled.i`
  font-style: normal;
  color:#333;
`;
const CollectOperate = styled.span`
`;
const Operation = styled.div`
  display:flex;
  display:none;
`;
const CollectImg = styled.img`
  margin:0;
  padding:0;
  width:35px;
  height:35px;
`;
const ProudecP = styled.p`
  margin: 0px 15px;
  word-break: break-all;
  font-family:'微软雅黑';
  color: #666;
  font-size: 14px;
  display:flex;
  line-height: 25px;
`;
const Lei = styled.i`
   font-style: normal;
   flex:1;
`;
const Rii = styled.i`
  font-style: normal;
  flex:1;
  text-align: right;
`;
const ItemContainer = styled(Link)`
  display:block;
  color:#000;
  text-decoration: none;
`;
function CollectItem(props) {
  console.log("产品收藏",props);
  let priceName = '';
  switch (props.userLevel){
    case 0:
       priceName = <PriceT>商城价：</PriceT>;
      break;
    case 1:
       priceName = <PriceT>会员价：</PriceT>;
      break;
    case 2:
       priceName = <PriceT>VIP价：</PriceT>;
      break;
    case 3:
      priceName = <PriceT>白金价：</PriceT>;
      break;
  }
  // console.log(props.is_validate);
  return (
    <CollectItemBox >
      <ItemContainer to={`/products/${props.id}`}>
        <Image src={props.images[0] || nogoodsImg} />
        <CollectTitle>{props.title}</CollectTitle>
      </ItemContainer>
      <ProudecP>产品编号:{props.product_no}</ProudecP>
      <ProudecP><Lei>规格:{props.spec}</Lei><Rii>等级:{props.level_text}</Rii></ProudecP>
      <Operate>
        {props.username2 !== null && props.username2 ?
          <Price><PriceT>商城价：</PriceT>￥{props.priceFace}/片</Price>:
          <Price>{priceName}￥{props.userPrice}/片</Price>
        }
      </Operate>
      <Operation className="aaa">
        <CollectOperate>
          <CollectImg src={goCart} onClick={e=>{props.addCart(props.index,props.collectId)}} />
        </CollectOperate>
        <CollectOperate onClick={(e)=>{
          props.removeCollect(props.collectId)
        }}>
          <CollectImg src={adelete} />
        </CollectOperate>
      </Operation>
    </CollectItemBox>
  );
}
CollectItem.propTypes = {
  id: PropTypes.any.isRequired,
  title: PropTypes.string,
  // price: PropTypes.string, //有时候传过来的值是string，有时候是number 不好判断
  produce_no:PropTypes.string,
  spc:PropTypes.string,
  level:PropTypes.string,
  removeCollect:PropTypes.func,
  addCart:PropTypes.func,
  userLevel:PropTypes.number,
};
export default CollectItem;
