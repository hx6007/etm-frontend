/**
 *
 * OrderListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import makeSelectOrderListPage from './selectors';
import test from 'images/test2.jpg';
import {makeSelectLogSiteCode, makeSelectUserId, makeSelectUserName2} from "../App/selectors";
import {getFatherOrderLists, updateOrderStatus} from "../../utils/service";



const BigDiv = styled.div`
  margin: 10px;
`;

const ChoiseOrder = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const AlreadyCheck = styled.div`
  height: 25px;
  width: 70px;
  text-align: center;
  border-bottom: ${props => props.checked ? "solid #000000 2px" : ""};
  margin-right: 20px;
  color: ${props => props.checked ? "#000" : "#5D5D5D"};
`;

const Thead = styled.thead`
  background: #E9E9E9;
  color: #999;
  text-align: left;
`;

const Tr = styled.tr`
  width: 100%;
  text-align: left;
  border-bottom: solid 0.1px #ccc;
  height: 60px;
`;

const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  border: solid 1px #cccccc;
`;

const Tbody = styled.tbody`
  color: #666;
  font-size: 13px;
`;

const Images = styled.img`
  height: 40px;
  width: 40px;
`;
const Td = styled.td`
  border: solid #CCCCCC 1px;
  padding-left: 27px;
  color: #FF9940;
  width: 100px;
`;
const TdPri = styled.td`
  border: solid #CCCCCC 1px;
  padding-left: 27px;
  width: 220px;
`;
const Tds = styled.td`
  border: solid #CCCCCC 1px;
  padding-left: 27px;
  color: #FB2235;
  width: 100px;
`;

const OperateDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 29px;
  span{
    padding: 5px 0;
    color: #ADADAD;
    width: 27px;
    &:hover{
      color: #2F5E99;
      border-bottom: solid #2F5E99 1px;
    }
  }
`;
const ThLeft = styled.th`
  padding-left: 10px;
`;
const TdLeft = styled.td`
  padding-left: 10px;
  width: 440px;

`;
const SpanName = styled.span`
  padding-left: 10px;
`;
const SpanC = styled.span`
  cursor: pointer;
`;
const SpanPriceA = styled.span`
  display: block;
  text-decoration: line-through;
  color: #AFADAF;
`;
const FacePrice = styled.span`
  text-decoration: line-through;
  color: #AFADAF;
  font-weight: 200;
  padding-right: 5px;
`;




export class OrderListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = {
      currentTab: 1,
      orderList: [],
      alreadyOrderList: [],
      orderStatus: ""
    }
    this.getOrderLists(props)
  }



  render() {
    const {currentTab} =this.state;
    return (
      <BigDiv>
        <ChoiseOrder>
          <AlreadyCheck checked={this.state.currentTab ===1} onClick={e => this.setState({currentTab: 1})}>待审核订单</AlreadyCheck>
          <AlreadyCheck checked={this.state.currentTab ===2} onClick={e => this.setState({currentTab: 2})}>已审核订单</AlreadyCheck>
        </ChoiseOrder>
        {this.getCurrentTab(currentTab)}
      </BigDiv>
    );
  }

  getOrderLists(props){
    const {userid,username2} = props;
    let sonOrFather;
    username2 !== null && username2 !== undefined ? sonOrFather = username2 : sonOrFather = userid;
    getFatherOrderLists(sonOrFather,"待审核",username2).then(data => {
        if(data.code !== 1) throw '服务器错误';
        let Lists = data.data;
        this.setState({orderList: Lists})
        }).catch(error => {
          console.log(error);
        });
      getFatherOrderLists(sonOrFather,"已审核",username2).then(data => {
          if(data.code !== 1) throw '服务器错误';
          let Lists = data.data;
          this.setState({alreadyOrderList: Lists});
        }).catch(error => {
          console.log(error);
        });
  }




  changeStatus(number,DocStatus){
    updateOrderStatus(number, DocStatus).then(data => {
      if(data.code !== 1) throw "服务器错误";
      alert(`${DocStatus}成功了！`)
      this.getOrderLists(this.props);
    }).catch(error => {
      console.log(error);
    })
  }

  // getStatus(whichStatus){
  //   switch (whichStatus){
  //     case ""
  //   }
  // }


  getCurrentTab(currentTab){
    let sonOrNot = this.props.username2 !== null && this.props.username2 !== undefined;
    switch (currentTab){
      default:
      case 1:
        return <div>
          { this.state.orderList.map((item,index) =>
            <Table key={item.number+index}>
              <Thead>
                <Tr >
                  <ThLeft>订单编号：{item.number}</ThLeft>
                  {sonOrNot ? <th>订单金额：￥{parseFloat(item.total_face_price).toFixed(2)}</th>:
                    <th>
                      <span>订单金额：<FacePrice>￥{parseFloat(item.total_face_price).toFixed(2)}</FacePrice>
                        <span>￥{parseFloat(item.total_price).toFixed(2)}</span>
                      </span>
                    </th>}
                  <th>&nbsp;</th>
                  <th>{item.order_date}</th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  (item.list||[]).map((items,i) =>
                    <Tr key={items.goods_name+i}>
                    {/*this.setState({})*/}
                      <TdLeft><Images src={items.goods_thumb} alt=""/><SpanName>{items.goods_name}</SpanName> </TdLeft>
                      <TdPri>
                        {sonOrNot ? <span>￥{parseFloat(items.face_price).toFixed(2)}</span>:
                          <span>
                            <SpanPriceA>￥{parseFloat(items.face_price).toFixed(2)}</SpanPriceA>
                            <span>￥{parseFloat(items.price).toFixed(2)}</span>
                          </span>
                        }
                        <SpanName>x{parseFloat(items.count).toFixed(0)}</SpanName>
                      </TdPri>
                      {item.DocStatus === "已驳回" ? (i === 0 && <Td rowSpan={item.list.length}>{item.DocStatus}</Td>): (i === 0 && <Tds rowSpan={item.list.length}>{item.DocStatus}</Tds>)}
                      {i===0 && <td rowSpan={item.list.length}>
                        {
                          sonOrNot ?
                          <OperateDiv>
                            <SpanC onClick={()=>{this.changeStatus(item.number,"删除")}}>删除</SpanC>
                          </OperateDiv>:
                            (
                              item.DocStatus === "已驳回" ?
                                <OperateDiv>
                                  <SpanC onClick={()=>{this.changeStatus(item.number,"删除")}}>删除</SpanC>
                                </OperateDiv>:
                                <OperateDiv>
                                  <SpanC onClick={()=>{this.changeStatus(item.number,"通过")}}>通过</SpanC>
                                  <SpanC onClick={()=>{this.changeStatus(item.number,"驳回")}}>驳回</SpanC>
                                  <SpanC onClick={()=>{this.changeStatus(item.number,"删除")}}>删除</SpanC>
                                </OperateDiv>

                            )
                        }
                      </td>}
                    </Tr>
                  )
                }
              </Tbody>
            </Table>
          )}
        </div>;
      case 2:
        return <div>
          { this.state.alreadyOrderList.map((item,index) =>
            <Table key={item.number+index}>
              <Thead>
              <Tr >
                <ThLeft>订单编号：{item.number}</ThLeft>
                {sonOrNot ? <th>订单金额：￥{parseFloat(item.total_face_price).toFixed(2)}</th>:
                  <th>
                      <span>订单金额：<FacePrice>￥{parseFloat(item.total_face_price).toFixed(2)}</FacePrice>
                        <span>￥{parseFloat(item.total_price).toFixed(2)}</span>
                      </span>
                  </th>}
                <th>&nbsp;</th>
                <th>{item.order_date}</th>
              </Tr>
              </Thead>
              <Tbody>
              {
                (item.list||[]).map((items,i) =>
                  <Tr key={items.goods_name+i}>
                    <TdLeft><Images src={items.goods_thumb} alt=""/><SpanName>{items.goods_name}</SpanName> </TdLeft>
                    <TdPri>
                      {sonOrNot ? <span>￥{parseFloat(items.face_price).toFixed(2)}</span>:
                        <span>
                            <SpanPriceA>￥{parseFloat(items.face_price).toFixed(2)}</SpanPriceA>
                            <span>￥{parseFloat(items.price).toFixed(2)}</span>
                          </span>
                      }
                      <SpanName>x{parseFloat(items.count).toFixed(0)}</SpanName>
                    </TdPri>
                    {item.DocStatus === "已驳回" ? (i === 0 && <Td rowSpan={item.list.length}>{item.DocStatus}</Td>): (i === 0 && <Tds rowSpan={item.list.length}>{item.DocStatus}</Tds>)}
                    {i===0 && <td rowSpan={item.list.length}>
                      {
                        sonOrNot ?
                          <OperateDiv>
                            <SpanC onClick={()=>{this.changeStatus(item.number,"删除")}}>删除</SpanC>
                          </OperateDiv>:
                          <OperateDiv>
                          {item.DocStatus === "已审核" ?
                            <SpanC onClick={()=>{this.changeStatus(item.number,"删除")}}>删除</SpanC>:
                            <div>
                              <SpanC onClick={()=>{this.changeStatus(item.number,"通过")}}>通过</SpanC>
                              <SpanC onClick={()=>{this.changeStatus(item.number,"驳回")}}>驳回</SpanC>
                              <SpanC onClick={()=>{this.changeStatus(item.number,"删除")}}>删除</SpanC>
                              </div>
                          }
                          </OperateDiv>
                      }
                    </td>}
                  </Tr>
                )
              }
              </Tbody>
            </Table>
          )}
        </div>
    }
  }
}

OrderListPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // orderlistpage: makeSelectOrderListPage(),
  userid: makeSelectUserId(),
  logSiteCode: makeSelectLogSiteCode(),
  username2: makeSelectUserName2()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
)(OrderListPage);
