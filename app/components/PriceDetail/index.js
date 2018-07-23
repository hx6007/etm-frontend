/**
*
* PriceDetail
*
*/

import React from 'react';
import styled from 'styled-components';
import { Icon, Divider, DatePicker, Select,Input,Button,Pagination,Spin } from 'antd';
import {getCheckBalance} from "../../utils/service";
const Option = Select.Option;
import locale from 'antd/lib/date-picker/locale/zh_CN';

const Table = styled.table`
  //margin-top: 20px;
  width: 100%;
  border: solid #e8e8e8 1px;
  margin-top: 20px;
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
  margin-top: 10px;
  border-bottom: solid 1px #e8e8e8;
`;

const Tds = styled.td`
  padding-left: 10px;
`;

const TdTwo = styled.td`
  .ant-select-selection{
    background-color: #E9E9E9;
    border: solid 1px #E9E9E9;
  }
  .ant-select-selection-selected-value{
    padding-right: 15px;
  }
`;

const Div = styled.div`
  width: 100%;
`;

const Spans = styled.span`
  padding-left: 20px;
`;

const SearchButton = styled.button`
  background-color: #F8F8F8 ;
  color: #000;
  font-size: 13px;
  height: 27px;
  width: 60px;
  margin-left: 70px;
  border: solid 1px #E7E8E9;
  cursor: pointer;
  padding-top: 5px;
`;

const PagDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const OutP = styled.td`
  color: #FC2D3E;
`;
const InP = styled.td`
  color: #39BA76;
`;
const ChooseDiv = styled.div`
   width: 100%;
  .ant-input{
    height: 25px;
    border-radius: 0;
    width: 150px;

  }
  .ant-select-selection--single{
    height: 27px;
    width: 150px;
  }
  .ant-select-selection__rendered{
    line-height: 27px;

  }
  .ant-select-selection{
    border-radius: 0;
  } 
`;


export class PriceDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      startTimes: "",
      endTimes: "",
      inOrOut: "",
      balanceDatas: {},
      pageNo: 1
    };
    this.getDatas();
  }


  onChangeStart(value, dateString){
    this.setState({startTimes: dateString})
  }

  onChangeEnd(value, dateString){
    this.setState({endTimes: dateString})
  }

  onOk() {
  }
  goPage(pageNumber){
    this.getDatas(pageNumber);
  }


  handleChange(values){
    const vvv = values
    this.setState({inOrOut: vvv})
  }


  getDatas=(pageNumber)=>{
    const beginday = this.state.startTimes;
    const endday = this.state.endTimes;
    const date = new Date(new Date().getTime() - 24*60*60*1000 );
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let datas = date.getDate()+1;
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (datas >= 0 && datas <= 9) {
      datas = "0" + datas;
    }
    const endTimes = year+"-"+month+"-"+datas;
    const username = this.props.usernames;
    const customerNo = this.props.customerNo;
    const values = this.state.inOrOut;
    const pageNo = pageNumber ||1;
    let params = {
      username: username,
      customer_no: customerNo,
      beginday: beginday||"2010-01-01",
      endTimes: endday || endTimes,
      screen: values || "",
      pageNo: pageNo,
    };
    getCheckBalance(params).then(data => {
      if(data.code === 1){
      const balanceData = data.data;
      this.setState({balanceDatas: balanceData});
      }
    }).catch(error => {
      console.log(error);
    })


  };

  render(){
    const allStatus = ["全部类型", "收入", "支出"];
    const getAllStatus = allStatus.map(status => <Option key={status}>{status}</Option>);
    return(
      <Div>
        <ChooseDiv>
          开始日期：
            <DatePicker placeholder="年/月/日"
                        onChange={(value, dateString) => this.onChangeStart(value, dateString)}
                        onOk={this.onOk()} />

          <Spans>
            到：<DatePicker placeholder="年/月/日"
                           onChange={(value, dateString) => this.onChangeEnd(value, dateString)}
                           onOk={this.onOk()}  />

          </Spans>
          <Spans>
            状态：<Select onChange={(values) => this.handleChange(values)} defaultValue={allStatus[0]} style={{ width: 100 }}>
              {getAllStatus}
            </Select>
          </Spans>
          <SearchButton onClick={() => {this.getDatas()}}>查询</SearchButton>
        </ChooseDiv>
        <Table>
          <Thead>
            <Tr>
              <Tds>日期</Tds>
              <TdTwo>
                {/*<Select onChange={(values) => this.handleChange(values)} defaultValue={allStatus[0]} style={{ width: 100 }}>*/}
                  {/*{getAllStatus}*/}
                {/*</Select>*/}
                {this.state.inOrOut||"全部类型"}
              </TdTwo>
              <td>详细说明</td>
            </Tr>
          </Thead>
          <tbody>
          {this.state.balanceDatas.list && this.state.balanceDatas.list.map((item,index) =>
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
        <PagDiv>
          <Pagination showTotal={(total) => `总共${total}条，资金明细`} defaultPageSize={10} defaultCurrent={1} total={this.state.balanceDatas.count} onChange={this.goPage.bind(this)} />
        </PagDiv>
      </Div>
    )
  }
}

PriceDetail.propTypes = {

};

export default PriceDetail;
