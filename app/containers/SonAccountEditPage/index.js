/**
 *
 * SonAccountEditPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSonAccountEditPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import OperateSonAccount from "../../components/OperateSonAccount/index";

export class SonAccountEditPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super();
    this.state = {
      sonEdit: []
    };
    const sonEdit = props.location.state&&props.location.state.sonList;
    this.state.sonEdit = sonEdit;
  }

  render() {
    return (
      <div>
        <OperateSonAccount sonEdit = {this.state.sonEdit} history = {this.props.history}/>
      </div>
    );
  }
}

SonAccountEditPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sonaccounteditpage: makeSelectSonAccountEditPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sonAccountEditPage', reducer });
const withSaga = injectSaga({ key: 'sonAccountEditPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SonAccountEditPage);
