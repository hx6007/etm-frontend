/**
 *
 * PerOrderListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPerOrderListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {Tabs, Input, DatePicker, Select, Button } from 'antd';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Option = Select.Option;
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
import OrderTable from '../../components/OrderTable/index';
import {makeSelectCustomerNo, makeSelectUserName, makeSelectUserName2} from "../App/selectors";
import {getOrderList} from "../../utils/service";
import { Pagination } from 'antd';



const OrderTab = styled.div`
  .ant-tabs-nav .ant-tabs-tab-active{
    color: #242424;
  }
  .ant-tabs-ink-bar{
    background-color: #242424;
  }
  .ant-btn-primary {
    background-color: #fff;
    border-color: #D9D9D9;
    color: #474747;
}
`;

const OrderNoInput = styled.input`
  border: solid #D9D9D9 1px;
`;

const ChooseCondition = styled.div`
  margin-left: 15px;
  margin-bottom: 20px;
`;

const Spans = styled.span`
  padding-left: 16px;
`;

const SearchButton = styled.button`
  background-color: #777A7D ;
  color: #fff;
  font-size: 13px;
`;

const Table = styled.table`
  //margin-top: 20px;
  width: 100%;
`;

const Tables = styled.table`
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
  height: 30px;
`;

const ThLeft = styled.th`
  padding-left: 10px;
  width: 663px;
`;

const ListDiv = styled.div`
  width: 100%;
`;

const PagDiv = styled.div`
  text-align: right;
  padding: 20px 0;
`;



export class PerOrderListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
    this.state = {
      startTimes: "",
      endTimes: "",
      waitPay: 1,
      orderList: "",
      pageNos: 1,
      dataCount: 0,
      DocStatus: ''
    };
    this.getPerOrderList(this.state.pageNos)
  }

  onChangeStart(value, dateString){
    this.setState({startTimes: dateString})
  }

  onChangeEnd(value, dateString){
    this.setState({endTimes: dateString})
  }

  onOk() {
  }
  changeOrStatus(values){
    this.setState({DocStatus: values})
  }

  changeTab(e){
    const TabIndex = e;
    this.setState({waitPay: TabIndex})
  }
  onShowSizeChange( pageSize) {
    this.setState({pageNos: pageSize});
    this.getPerOrderList(pageSize);
  }

  getPerOrderList(pageSize){
    const customerNo = this.props.customer_no;
    const pageNos = pageSize;
    const { startTimes,endTimes,DocStatus} = this.state;
    getOrderList(customerNo,pageNos,startTimes,endTimes,DocStatus).then(data => {
      if(data.code === 1){
       this.setState({orderList: data.data,dataCount: parseInt(data.message) });
      }
    }).catch(error => {
      console.log(error);
    })
  }
  //按条件筛选查询列表
  inquire(){
    const customerNo = this.props.customer_no;
    const { startTimes,endTimes} = this.state;
    const pageNos = 1;
    const DocStatus = this.state.DocStatus === '请选择' ? "" : this.state.DocStatus;
    getOrderList(customerNo,pageNos,startTimes,endTimes,DocStatus).then(data => {
      if(data.code === 1){
        this.setState({pageNos,orderList: data.data,dataCount: parseInt(data.message) });
      }
    }).catch(error => {
      console.log(error);
    })
  }
  render() {
    let operations;
     this.state.waitPay == 2 ?  operations = <span>
                                  <Button>入账申请</Button>
                                  <Button>余额查询</Button><Search
                                  placeholder="商品名称/编号/订单号"
                                  onSearch={value => console.log(value)}
                                  style={{ width: 200 }}
                                  />
                                </span>:
                               operations = <Search
                                 placeholder="商品名称/编号/订单号"
                                 onSearch={value => console.log(value)}
                                 style={{ width: 200 }}
                                />;
    // const allStatus = ['请选择','待受理', '已受理', '产销审核', '财务审核', '调仓中', '拣货中', '打托中', '查货中', '未备货', '加工中', '已备货', '配送中', '已完成'];
    const allStatus = ['请选择','未受理', '受理中','受理完成'];
    const getAllStatus = allStatus.map(status => <Option key={status}>{status}</Option>)
    return (
      <div>
        <OrderTab>
          {/*<Tabs tabBarExtraContent={operations} onChange={(e) => this.changeTab(e)} >*/}
          <Tabs onChange={(e) => this.changeTab(e)} >
            <TabPane tab="全部订单" key="1" style={{ marginTop: 15 }} >
              <ChooseCondition>
                开始日期：<DatePicker placeholder="年/月/日"
                                 format="YYYY-MM-DD"
                                 onChange={(value, dateString) => this.onChangeStart(value, dateString)}
                                 onOk={this.onOk()} />
                <Spans>
                  到：<DatePicker placeholder="年/月/日"
                                 format="YYYY-MM-DD"
                                 onChange={(value, dateString) => this.onChangeEnd(value, dateString)}
                                 onOk={this.onOk()} />

                </Spans>
                {/*<Spans>*/}
                  {/*单号：<OrderNoInput/>*/}
                {/*</Spans>*/}
                <Spans>
                  状态：<Select onChange={(values) => this.changeOrStatus(values)} defaultValue={allStatus[0]} style={{ width: 100 }}>
                    {getAllStatus}
                  </Select>
                </Spans>
                <Spans>
                  <SearchButton onClick={()=>{this.inquire()}}>查询</SearchButton>
                </Spans>
              </ChooseCondition>
              <div>
                <Table>
                  <Thead>
                    <Tr>
                      <ThLeft>订单详情</ThLeft>
                      <th>&nbsp;</th>
                      <th>状态</th>
                      <th>金额</th>
                    </Tr>
                  </Thead>
                </Table>
                <ListDiv>
                  <OrderTable tab="全部订单" orderList = {this.state.orderList} username={ this.props.username} username2={this.props.username2} />
                </ListDiv>
                <PagDiv>
                  <Pagination defaultCurrent={1} current={this.state.pageNos} onChange={(pageNos) => this.onShowSizeChange(pageNos)} total={this.state.dataCount} />
                </PagDiv>
              </div>
            </TabPane>
            {/*<TabPane tab="待付款" key="2">*/}
              {/*<Tables>*/}
                {/*<OrderTable tab = "待付款" />*/}
              {/*</Tables>*/}
            {/*</TabPane>*/}
            {/*<TabPane tab="待收货" key="3">*/}
              {/*<Tables>*/}
                {/*<OrderTable tab = "待收货" />*/}
              {/*</Tables>*/}
            {/*</TabPane>*/}
            {/*<TabPane tab="已完成" key="4">*/}
              {/*<Tables>*/}
                {/*<OrderTable tab = "已完成" />*/}
              {/*</Tables>*/}
            {/*</TabPane>*/}
          </Tabs>
        </OrderTab>
      </div>
    );
  }
}

PerOrderListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  perorderlistpage: makeSelectPerOrderListPage(),
  customer_no: makeSelectCustomerNo(),
  username: makeSelectUserName(),
  username2: makeSelectUserName2()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'perOrderListPage', reducer });
const withSaga = injectSaga({ key: 'perOrderListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PerOrderListPage);
