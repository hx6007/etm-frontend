/**
 *
 * AddressEditPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAddressEditPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import HtmlTitle from '../../components/HtmlTitle/index';
import OperateAddress from '../../components/OperateAddress/index';
import GetPlatform from "../../components/GetPlatform";

export class AddressEditPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      addEdit:[]
    };
    const addEdit=props.location.state&&props.location.state.addresslist;
    this.state.addEdit = addEdit;
  }
  render() {
    const platform = GetPlatform();
    return (
      <div>
        <HtmlTitle title={platform.name + "- 收货地址编辑"} />
        <div>收货地址编辑</div>
        <OperateAddress addEdit = {this.state.addEdit} history={this.props.history}/>
      </div>
    );
  }
}

AddressEditPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addresseditpage: makeSelectAddressEditPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'addressEditPage', reducer });
const withSaga = injectSaga({ key: 'addressEditPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddressEditPage);
