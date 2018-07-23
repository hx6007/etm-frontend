/**
 *
 * JinXiaoCunSearchPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Icon, Divider, DatePicker, Select,Input,Button,Pagination,Spin,message } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectJinXiaoCunSearchPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {makeSelectCustomerNo} from "../App/selectors";

const ChooseDiv = styled.div`
   width: 100%;
   padding-bottom: 20px;
  .ant-input{
  //  height: 25px;
    border-radius: 0;
  //  width: 150px;
  //
  }
  //.ant-select-selection--single{
  //  height: 27px;
  //  width: 150px;
  //}
  //.ant-select-selection__rendered{
  //  line-height: 27px;
  //
  //}
  .ant-select-selection{
    //border-radius: 0;
  } 
`;

const Spans = styled.span`
  padding-left: 31px;
`;

export class JinXiaoCunSearchPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  //开始时间
  onChangeStart(value, dateString){
    console.log("dateString",dateString);
    // this.setState({startTimes: dateString})
  }

  //结束时间
  onChangeEnd(value, dateString){
    console.log("dateString111",dateString);
    // this.setState({endTimes: dateString})
  }

  onOk() {
  }

  render() {
    return (
      <div>
        <ChooseDiv style={{ paddingLeft:"6px",paddingTop:"31px",paddingBottom:"23px" }}>
          开始日期：
          <DatePicker style={{ paddingRight:"10px",width: 140 }}
                      placeholder="年/月/日"
                      onChange={(value, dateString) => this.onChangeStart(value, dateString)}
                      onOk={this.onOk()} />
          到<DatePicker style={{ paddingLeft:"10px",width: 140 }}
                       placeholder="年/月/日"
                       onChange={(value, dateString) => this.onChangeEnd(value, dateString)}
                       onOk={this.onOk()}  />
        <Spans><Button onClick={this.searchOk} style={{ width:"61px",borderRadius:"0" }}>查询</Button></Spans>
        </ChooseDiv>
        <div style={{ width:"910",height:"50px",background:"#F8F8F8" }}></div>
      </div>
    );
  }
}

JinXiaoCunSearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  jinxiaocunsearchpage: makeSelectJinXiaoCunSearchPage(),
  customer_no: makeSelectCustomerNo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'jinXiaoCunSearchPage', reducer });
const withSaga = injectSaga({ key: 'jinXiaoCunSearchPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(JinXiaoCunSearchPage);
