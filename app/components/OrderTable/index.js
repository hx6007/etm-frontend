/**
*
* OrderTable
*
*/

import React from 'react';
import styled from 'styled-components';
import shose from 'images/test2.jpg';
import {Link} from 'react-router-dom';



const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  border: solid 2px #EBEDF0;
`;

const Thead = styled.thead`
  background: #E9E9E9;
  color: #999;
  text-align: left;
`;

const Tr = styled.tr`
  width: 100%;
  text-align: left;
  height: 30px;
`;

const Ths = styled.th`
  font-weight: 100;
  padding-left: 10px;
`;

const Tbody = styled.tbody`
  color: #666;
  font-size: 13px;
`;
const Td = styled.td`
  border: solid #EBEDF0 2px;
  padding: 10px 0 10px 10px;
  width: 100px;
`;

const Td1 = styled(Td)`
  width: 300px;
  border-right-color: #FAFAFA;
  height: 70px;
`;

const Statuss = styled.span`
  display: flex;
  justify-content: center;
`;

const SmallImg = styled.img`
  height: 35px;
  width: 35px;
`;

const Span1 = styled.span`
  display: flex;
`;

const Span2 = styled.span`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

const SpanSome = styled(Span2)`
  text-align: center;
`;

const SpanAllP = styled(Span2)`
  text-align: right;
`;

const SpanPrice = styled.span`
  padding: 0 30px;
  
`;

const AllPrice = styled.span`
  font-weight: bold;
  border-bottom: solid 2px #EBEDF0; 
  //width: 120px;
  padding-right: 15px;
`;

const SendP = styled.span`
  padding-top: 10px;
  color: #8B8E90;
`;

const SpanPallet = styled.span`
  color: #8B8E90;
`;

const DetailLink = styled(Link)`
  
`;

const ProName = styled.span`
  padding-top: 6px;
`;


function StatusShow(tab) {
  let allStatus;
  switch (tab){
    case "全部订单":
      return allStatus =
        <SpanSome>
          <span>待受理</span>
          <span>订单详情</span>
        </SpanSome>;
    case "待付款":
      return allStatus =
        <SpanSome>
          <span>待付款</span>
        </SpanSome>;
    case "待收货":
      return allStatus =
        <SpanSome>
          <span>待收货</span>
        </SpanSome>;
    case "已完成":
      return allStatus =
        <SpanSome>
          <span>已完成</span>
        </SpanSome>;
  }
}


function OrderTable(props) {
  //切换tab的状态
  const StatusShows =StatusShow(props.tab);
  let OrderList;
  if(props.orderList.length >0){
    OrderList = props.orderList ;
  }else {
    OrderList = [];
  }
  return (
    <div>
      {OrderList.map((item, index) =>
        <Table key={index}>
          <Thead>
            <Tr>
              <Ths colSpan={4}>{item.docdate} <SpanPrice>订单编号：<span>{item.doccode}</span></SpanPrice></Ths>
            </Tr>
          </Thead>
          <Tbody>
          {item.orderData!== undefined && item.orderData.orderList.length > 0 &&(item.orderData.orderList || []).map((items,i) =>

            <Tr key={i}>
              <Td1>
                <Span1>
                  <SmallImg src={items.goods_thumb} alt=""/>
                  <Span2>
                    <ProName>{items.goods_name}</ProName>
                    {/*<span>{items.goods_code}</span>*/}
                  </Span2>
                </Span1>
              </Td1>
              <Td>
                <SpanPrice>￥{parseFloat(items.price).toFixed(2)}</SpanPrice>
                <span>x{items.count}</span></Td>
              {i===0 && <Td rowSpan={item.orderData.orderList.length}>
                {/*{StatusShows}*/}
                <Statuss>{item.DocStatus}</Statuss>
              </Td>}
              {i===0 &&  <Td rowSpan={item.orderData.orderList.length}>
                <SpanAllP>
                  <AllPrice>总额：￥{parseFloat(item.orderData.total_price).toFixed(2)}</AllPrice>
                  {/*<SendP>运费：￥0.00</SendP>*/}
                  {/*<SpanPallet>打托费用：￥0.00</SpanPallet>*/}
                </SpanAllP>
              </Td>}
            </Tr>

            )}

          </Tbody>
        </Table>

      )}
    </div>
  );
}

OrderTable.propTypes = {

};

export default OrderTable;
