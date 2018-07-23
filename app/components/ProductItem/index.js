/**
 *
 * ProductItem
 *
 */

import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import {Link} from 'react-router-dom';
import noPic from 'images/no_pic.jpg';
import {SITE_CODE} from "../../utils/serverUrl";


const ItemContainer = styled(Link)`
    //display: flex;
    overflow: hidden;
    flex-direction: column;
    margin: 30px 0 0 20px ;
    width: 280px;
    text-decoration: none;
    color: #333333;
    border: 1px solid #eeeeee;
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px transparent;
    transition-duration: 0.3s;
    transition-property: box-shadow;
    &:hover,&:focus,&:active {
      border:1px solid transparent;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.6); 
    }
    .ant-card-meta-description{
      color: #333333;
      font-weight: 500;
      font-size: 16px;
    }
    .ant-card-bordered{
      border: none;
    }
    
  `;
const Title = styled.span`
    word-break: break-all;
    
  `;
const Price = styled.span`
    margin: 0 15px 15px 10px;
    color: #dd250c;
  `;
const Spans=styled.span`
`;
const FuturesButton = styled.button`
  border: solid #BE9478 1px;
  margin-left: 10px;
  border-radius: 3px;
  color: #BE9478;
  font-size: 13px;
`;

function ProductItem(props) {
  let judgeFutures = SITE_CODE === "97ejk" && props.Futures !== undefined && props.Futures === "期货";
  return (
    <ItemContainer to={`/products/${props.id}`} target="_blank">
      <LazyLoad height={200}>
        <Card
          hoverable
          style={{ width: 280 }}
          cover={<img alt={props.title} src={props.image || noPic } /> }

        >
          <Meta
            title= {props.userLevel == 0 || props.username2 !== null && props.username2 !== undefined ? <Spans>商城价：<Price>¥{props.price}/{props.unit}</Price></Spans> : <Spans>会员价：<Price>¥{props.price}/{props.unit}</Price></Spans>}
            description= {<Title>{props.title} {judgeFutures ? <FuturesButton>{props.Futures}</FuturesButton> : ""}</Title>}
          />
        </Card>
      </LazyLoad>
    </ItemContainer>
  );
}

ProductItem.propTypes = {
  id: PropTypes.any.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.any,

};

export default ProductItem;

