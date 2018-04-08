/**
*
* DiningItem
*
*/

import React from 'react';
import {Card} from 'antd';
const {Meta} = Card;
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import noPic from 'images/no_pic.jpg';

const ItemList = styled(Link)`
  display: flex;
  flex-direction: column;
  padding-top: 27px;
  //width: 380px;
  .ant-card-bordered {
    border: none;
    cursor: pointer;
  }
  .ant-card-cover{
    height: 240px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .ant-card-meta-title{
    white-space: inherit;
    text-align: center;
    font-size: 18px;
  }
  .ant-card-meta-description{
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
  }
  .ant-card-actions > li:not(:last-child) {
    border-right: none; 
    background: #fff;
  }
  .ant-card-actions{
    background: #fff;
    margin: 0 20px;
  }
  &:hover{
    .ant-card-actions{
      border-top:1px solid #278976;
    }
    .ant-card-meta-title{
      color: #278976;
    }
    .ant-card-bordered {
      box-shadow: 0px 4px 13px 0px rgba(119,119,119,0.51);
    }
  }
`;

const Price = styled.span`
  color: #278976;
  font-size: 18px;
  font-weight: 500;
`;
const ListImg = styled.img`
  //height: 240px;
`;
const OldPrice = styled.span`
  text-decoration: line-through;
`;
const SpanName = styled.span`
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  display: block;
`;


function DiningItem(props) {
  return (
    <ItemList to={`/diningHallDetail/${props.docCode}`} target="_blank">
      <Card
        style={{ width: 380,marginRight: 20,marginBottom: 25 }}
        cover={<ListImg alt={props.TCname} src={props.file_key||noPic} />}
        actions = {[<Price>￥{props.price}</Price>,<div>原价：<OldPrice>￥{props.oldPrice}</OldPrice></div>]}
      >
        <Meta
          title={<SpanName>{props.TCname}&nbsp;</SpanName>}
          description={<SpanName>{props.TCtitle}&nbsp;</SpanName>}
        />
      </Card>
    </ItemList>
  );
}

DiningItem.propTypes = {

};

export default DiningItem;
