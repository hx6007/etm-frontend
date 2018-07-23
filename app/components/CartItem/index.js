/**
*
* CartItem
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Noimg from './Noimg.jpg'
import {Link} from 'react-router-dom';

const Tr = styled.tr`
  width: 100%;
  border-bottom: 0.8px solid #ccc;
  text-align: left;
`;
const Td = styled.td`
  padding-left:10px;
`;
const Tdp = styled(Td)`
  color:#3c3c3c;
  font-weight:700;
`;
const Tdpa = styled(Tdp)`
  color:rgb(197,34,66);
  font-weight:700;
`;
const CountInput = styled.input`
  width:25px;
  height:25px;
  font-size:16px;
  text-align: center;
  vertical-align: top;
  border: 1px solid gray;
`;

const CountWrite = styled.input`
  text-align: center;
  width: 55px;
  height: 25px;
  font-size:16px;
  vertical-align: top;
  border: 1px solid gray;
`;
const Image = styled.img`
  margin:10px;
  width:80px;
  max-height:80px;
`;
const Linka = styled.span`
	display: flex;
	align-items: center;
	padding: 5px 10px;
	&:hover{
	  color: #E73F84;
	}
`;
const ItemContainer = styled(Link)`
  display:flex;
  color:#000;
  text-decoration: none;
`;
const Detail = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`;
CartItem.propTypes = {
  id: PropTypes.any.isRequired,
  cartId: PropTypes.any,
  image: PropTypes.string,
  productDetail: PropTypes.string,
  // price: PropTypes.number,
  remove:PropTypes.func,
  addCount:PropTypes.func,
  minCount:PropTypes.func,
  changeCount:PropTypes.func,
  getPirce:PropTypes.func,
  addToCollect:PropTypes.func
};

function CartItem(props) {
  return (
      <Tr>
        <Td><input type="checkbox" checked={props.checked} onChange={e => {
          if(props.checked){
            props.uncheckItem(props.index)
          }else {
            props.checkItem(props.index)
          }
          }}/></Td>
        <Td colspan='2'><ItemContainer to={`/products/${props.id}`}><Image src={props.images[0] || Noimg}/><Detail>{props.title}<br />配送仓：{props.warehouse}<br />等级：{props.level_text}</Detail></ItemContainer></Td>
        {props.username2 !== null && props.username2 !== undefined ?
        <Tdp>{props.priceFace || 0}</Tdp>
        :
        <Tdp>{props.userPrice || 0}</Tdp>
        }
        <Td>
          <CountInput value="-" type="button" onChange={e => {}} onClick={e =>
            props.handleQuantityChange(props.index,parseInt(props.count)-1,props.cartId)} />
          <CountWrite  type="number" onChange={(e)=>
            props.handleQuantityChange(props.index,parseInt(e.target.value),props.cartId)}
          value={props.count || 1}  />
          <CountInput  value="+" type="button" onChange={e => {}} onClick={e =>
            props.handleQuantityChange(props.index,parseInt(props.count)+1,props.cartId)}/>
         </Td>
        {/*<Td>{props.warehouse}</Td>*/}
        {
          props.username2 !== null && props.username2 !== undefined ?
            <Tdpa>{(parseFloat(props.priceFace)*parseFloat(props.count)).toFixed(2)}</Tdpa>:
            <Tdpa>{(parseFloat(props.userPrice)*parseFloat(props.count)).toFixed(2)}</Tdpa>
        }
        <Td><Linka href="javascript:;" onClick={e => {
          props.removeItem(props.index,props.cartId); //sku_id
        }}>删除</Linka><Linka href="javascript:;" onClick = {e => {props.addToCollect(props.id,props.index,props.cartId)}}>移入我的收藏</Linka></Td>
      </Tr>
    );
  }
export default CartItem;

