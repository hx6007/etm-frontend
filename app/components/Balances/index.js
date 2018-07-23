/**
*
* Balances
*
*/

import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Icon } from 'antd';
import 'url-search-params-polyfill';
import {getDefaultHall} from "../../utils/service";


const PriceDiv = styled.div`
  border: solid #F5F5F5 1px;
  height: 160px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ThreeShow = styled.div`
  display: flex;
  //flex-direction: column;
`;

const SpanPri = styled.span`
  font-weight: bold;
  padding-bottom: 10px;
  
`;
const SpanNo = styled.span`
  border-top: solid #F5F5F5 1px;
  font-size: 18px;
  font-weight: bold;
  padding-top: 10px;
`;
const NormalP = styled.span`
  font-size: 13px;
  padding-top: 10px;
  span{
    font-weight: bold;
  }
`;
const PromisP = styled.span`
  font-size: 13px;
  padding: 10px 0 0 0;
  span{
    font-weight: bold;
    padding-top: 10px;
  }
`;

const AllPrice = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
`;

const ChoiseSome = styled.div`
  display: flex;
  flex-direction: column;
  height: 160px;
  width: 200px;
  background: #F0F0F0;
  align-items: center;
  justify-content: center;
  
`;

const RendInbalance = styled.div`
  height: 25px;
  width: 120px;
  background: #009B3A;
  margin: 10px 0;
  text-align: center;
  color: #fff;
  cursor: pointer;
`;
const RendPri = styled(RendInbalance)`
  background: #fff;
  color: #000;
  cursor: pointer;
`;

const Table = styled.table`
  //margin-top: 20px;
  border: solid #e8e8e8 1px;
  width: 100%;
`;

const Thead = styled.thead`
  background: #E9E9E9;
  color: #999;
  text-align: left;
`;

const Tr = styled.tr`
  width: 100%;
  text-align: left;
  height: 35px;
  font-size: 13px;
  border-bottom: solid 1px #e8e8e8;
  margin-top: 10px;
`;

const Tds = styled.td`
  padding-left: 10px;
`;

const MoreDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Mores = styled.span`
  margin-top: 30px;
  height: 30px;
  width: 138px;
  border: solid 1px #F4F4F4;
  font-size: 13px;
  color: #000;
  text-align: center;
  padding-top: 5px;
  cursor: pointer;
`;
const NowPriceDetail = styled.div`
  padding: 30px 0 10px 0;
`;
const OutP = styled.td`
  color: #FC2D3E;
`;
const InP = styled.td`
  color: #39BA76;
`;
const ODiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 15px;

`;
const TDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;





export class Balances extends React.Component{
 constructor(props){
   super();

 }

  changeKeyss(){
    this.props.changeKey("3")
  }
  changeKes2(){
    this.props.changeKey("2")

  }

  render(){
    const billData = this.props.allDatas;
    const billDataPer = billData.data;
    return (
    <div>
      {billDataPer &&
        <PriceDiv>
          <AllPrice>
            <SpanPri>总余额（RMB）</SpanPri>
            <SpanNo>{parseFloat(billDataPer.sum||0).toFixed(2)}元</SpanNo>
          </AllPrice>
            <ThreeShow>
              <ODiv>
                <NormalP>正常货款：<span>￥{parseFloat(billDataPer["113101"]||0).toFixed(2)} </span></NormalP>
                <PromisP>保证金返利：<span>￥{parseFloat(billDataPer["218126"]||0).toFixed(2)}</span></PromisP>
                <NormalP>9.5折预付款：<span>￥{parseFloat(billDataPer["113110"]||0).toFixed(2)}</span></NormalP>
                <NormalP>9折预付款：<span>￥{parseFloat(billDataPer["113111"]||0).toFixed(2)}</span></NormalP>
                <NormalP>季度返利：<span>￥{parseFloat(billDataPer["218123"]||0).toFixed(2)}</span></NormalP>
                <NormalP>广告返利：<span>￥{parseFloat(billDataPer["218122"]||0).toFixed(2)}</span></NormalP>
                <NormalP>专用预付款：<span>￥{parseFloat(billDataPer["113106"]||0).toFixed(2)}</span></NormalP>
              </ODiv>
              <TDiv>
                <NormalP>积分返利：<span>￥{parseFloat(billDataPer["218114"]||0).toFixed(2)}</span></NormalP>
                <NormalP>6折预付款：<span>￥{parseFloat(billDataPer["113117"]||0).toFixed(2)}</span></NormalP>
                <NormalP>5.5折预付款：<span>￥{parseFloat(billDataPer["113118"]||0).toFixed(2)}</span></NormalP>
                <NormalP>5折预付款：<span>￥{parseFloat(billDataPer["113119"]||0).toFixed(2)}</span></NormalP>
                <NormalP>装修返利：<span>￥{parseFloat(billDataPer["218113"]||0).toFixed(2)}</span></NormalP>
                <NormalP>众筹货款：<span>￥{parseFloat(billDataPer["113115"]||0).toFixed(2)}</span></NormalP>
              </TDiv>
            </ThreeShow>
          <ChoiseSome>
            <RendInbalance onClick={() =>{this.changeKeyss()}}>入账申请</RendInbalance>
            <RendPri onClick={() =>{this.changeKes2()}}><span>资金明细</span></RendPri>
          </ChoiseSome>
        </PriceDiv>
      }
      <div>
        <NowPriceDetail>最近资金明细</NowPriceDetail>
        <Table>
          <Thead>
            <Tr>
              <Tds>时间</Tds>
              <td>收入/支出</td>
              <td>详细说明</td>
            </Tr>
          </Thead>
          <tbody>
            {billData.list && billData.list.slice(0,3).map((item,index) =>
              <Tr key={index}>
                <Tds>{item.mydocdate}</Tds>
                  {item.amount_debit === 0 ?
                    <OutP>-{parseFloat(item.amount_credit).toFixed(2)}</OutP>:
                    <InP>+{parseFloat(item.amount_debit).toFixed(2)}</InP>
                  }
                <td>{item.text}</td>
              </Tr>
            )}
          </tbody>
        </Table>
      </div>
      <MoreDiv>
        <Mores onClick={() =>{this.changeKes2()}}>查看更多明细<Icon type="double-right" style={{paddingLeft: '5px'}} /></Mores>
      </MoreDiv>
    </div>
  );
  }
}

Balances.propTypes = {

};

export default Balances;
