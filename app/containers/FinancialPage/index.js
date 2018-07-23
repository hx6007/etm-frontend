/**
 *
 * FinancialPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {Tabs, Input, Select, Button,DatePicker } from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectFinancialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import Balances from "../../components/Balances/index";
import PriceDetail from "../../components/PriceDetail/index";
import InBalances from "../../components/InBalances/index";
import ApplyInBalance from "../../components/ApplyInBalance/index";
import {makeSelectCustomerNo, makeSelectSiteCode, makeSelectUserName} from "../App/selectors";
import {getCheckBalance} from "../../utils/service";



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

const Spans = styled.span`
  padding-left: 16px;
`;

const SearchButton = styled.button`
  background-color: #F8F8F8 ;
  color: #000;
  font-size: 13px;
  height: 29px;
  width: 60px;
  margin-left: 20px;
  border: solid 1px #E7E8E9;
`;



export class  FinancialPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = {
      startTimes: "",
      endTimes: "",
      activekey: "1",
      showIn: false,
      allData: {}
    };
    this.getData(props);
  }

  changeKey(e){
    this.setState({activekey: e,showIn: false })
  }

  changeInBa(shows){
    this.setState({showIn: shows})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const leftactivekey = nextProps.location.search.slice(8);
      this.setState({activekey: leftactivekey})
    }
  }



  getData(props){
    const {username, customer_no,site_code} = this.props;
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
    let params = {
      username: username,
      customer_no: customer_no,
      endTimes: endTimes,
      beginday: "2010-01-01",
      screen: ""

    };
    getCheckBalance(params).then(data => {
      this.setState({allData: data.data})

    }).catch(error => {
      console.log(error);
    })

  }


  render() {
    const allStatus = ["全部类型", "支出", "收入"];
    const getAllStatus = allStatus.map(status => <Option key={status}>{status}</Option>);
    return (
      <div>
        <OrderTab>
          <Tabs activeKey={this.state.activekey} onChange={(e) => {this.changeKey(e)}}>
            <TabPane tab="余额查询" key="1">
              <Balances allDatas = {this.state.allData}  changeKey={(key)=>{this.changeKey(key)}} />
            </TabPane>
            <TabPane tab="资金明细" key="2" >
              <div>
                <PriceDetail customerNo = {this.props.customer_no} usernames = {this.props.username}/>
              </div>
            </TabPane>
            <TabPane tab="入账申请" key="3">
              {
                this.state.showIn === false ?
              <ApplyInBalance customerNo = {this.props.customer_no} usernames = {this.props.username} changeInBa={() => this.changeInBa("true")} /> :
              <InBalances username = {this.props.username} customer_no = {this.props.customer_no} changeInBa={() => this.changeInBa(false)}/>
              }
            </TabPane>
          </Tabs>
        </OrderTab>
      </div>
    );
  }
}

FinancialPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  financialpage: makeSelectFinancialPage(),
  customer_no: makeSelectCustomerNo(),
  username: makeSelectUserName(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'financialPage', reducer });
const withSaga = injectSaga({ key: 'financialPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FinancialPage);
