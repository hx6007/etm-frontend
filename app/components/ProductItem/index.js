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

function ProductItem(props) {
  return (
    <ItemContainer to={`/products/${props.id}`} target="_blank">
      <LazyLoad height={200}>
        <Card
          hoverable
          style={{ width: 280 }}
          cover={<img alt={props.title} src={props.image || noPic } /> }

        >
          <Meta
            title= {props.userLevel == 0 ? <Spans>商城价：<Price>¥{props.price}/{props.unit}</Price></Spans> : <Spans>会员价：<Price>¥{props.price}/{props.unit}</Price></Spans>}
            description= {<Title>{props.title}</Title>}
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

