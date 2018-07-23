/**
 *
 * CheckAllPage
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
import makeSelectCheckAllPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import CheckProducts from "../../components/CheckProducts/index";
import CheckPrice from "../../components/CheckPrice/index";
import {makeSelectCustomerGrade, makeSelectUserLevel, makeSelectUserType} from "../App/selectors";

const ChooseTab = styled.div`
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

export class CheckAllPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(){
    super();
    this.state = {};
  }

  render() {
    console.log("thisprops", this.props);
    return (
      <div>
        <ChooseTab>
          <Tabs defaultActiveKey="1">
            <TabPane tab="库存查询" key="1">
              <CheckProducts />
            </TabPane>
            <TabPane tab="价格查询" key="2">
              <CheckPrice levels = {this.props.levels} customerGrade = {this.props.customer_grade} clttype = {this.props.clttype} />
            </TabPane>
          </Tabs>
        </ChooseTab>
      </div>
    );
  }
}

CheckAllPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  checkallpage: makeSelectCheckAllPage(),
  customer_grade: makeSelectCustomerGrade(),
  clttype: makeSelectUserType(),
  levels: makeSelectUserLevel()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'checkAllPage', reducer });
const withSaga = injectSaga({ key: 'checkAllPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CheckAllPage);
