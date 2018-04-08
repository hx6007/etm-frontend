/*
* 申请列表
* */

import React from 'react';
import styled from 'styled-components';
import {VerticalLayout,HorizontalLayout} from '../../components/Layout/index';
import icForm from 'images/register/form-icon.png';
import PlusXing from "../../components/PlusXing";

const ApplicantListDiv =styled(VerticalLayout)`
    width: 80%;
    height: auto;
  `;
const HeaderView = styled.div`
    padding-bottom: 8px;
    border-bottom: 1px dashed #afafaf;
    overflow: hidden;
  `;
const ListImg = styled.img`
    display: inline-flex;
    width: 36px;
    height: 32px;
    margin:0 0;
  `;
const HeaderTitle = styled.span`
    vertical-align: middle;
    font-size: 20px;
    margin-left: 10px;
    color: #4d575d;
  `;
const TipsView = styled.span`
    font-size: 14px;
    margin-left: 3px;
    color: #4d575d;
  `;
const TipsNum = styled.span`
    font-size: 16px;
    color: #ff1e00;
`;
const Table = styled.table`
    width: 100%;
    height: 700px;
    margin-top: 30px;
    border: 1px solid #bbbbbb;
    text-align:center;
  `;
const Thead = styled.thead`
    height: 40px;
    justify-content: space-around;
    background-color: #eeeeee;
    border-bottom: 1px solid #bbbbbb;
  `;
const TitleSpan = styled.span`
    font-size: 16px;
    font-weight: normal;
    color: #999;
    vertical-align: middle;
  `;
const Tbody = styled.tbody``;

const Tr = styled.tr`
  background-color: transparent;
  border-bottom: 2px dotted #bbbbbb;
`;

Date.prototype.format = function(fmt) { 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt; 
}      


function RegisterList(props){
  const list = props.registerList;
  const listItems = list.map((listitem,index) =>
    <Tr key={index}>
      <td>{listitem.created_at && new Date(`${listitem.created_at}`).format("MM-dd") }</td>
      <td>{listitem.province} </td>
      <td>{PlusXing(listitem.name,2,2)}</td>
      <td>{PlusXing(listitem.contact,1,0)}</td>
    </Tr>
  );
  return (
    <Tbody>{listItems}</Tbody>
  );

}

function ApplicantList(props){
  return(
    <ApplicantListDiv>
      <HeaderView>
        <ListImg src={icForm} alt="申请列表"></ListImg>
        <HeaderTitle>申请列表</HeaderTitle>
        <TipsView>已有<TipsNum>{props.registerCount}</TipsNum>个商户成功入驻</TipsView>
      </HeaderView>
        <Table>
          <Thead>
              <th>日期</th>
              <th>省份</th>
              <th>公司</th>
              <th>客户</th>
          </Thead>
          <RegisterList registerList={props.registerL}></RegisterList>
        </Table>
    </ApplicantListDiv>
  );
}

export default ApplicantList;

