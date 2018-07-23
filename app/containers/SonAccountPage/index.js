/**
 *
 * SonAccountPage
 *
 */

import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import './SonAccount.css';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSonAccountPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import SonAccount from "../../components/SonAccount/index";
import {makeSelectLogSiteCode, makeSelectUserName} from "../App/selectors";
import {deleteSonAccount, getSonAccountList} from "../../utils/service";



const Alink = styled(Link)`
  text-decoration: none;
  color: #FF1D4B;
`;

export class SonAccountPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super();
    this.state ={
      sonAccountList: []
    };
    console.log("props",props);
    this.getDataList(props)
  }

  getDataList(props){
    console.log("propsusername",props.username);
    getSonAccountList(props.username).then(data =>{
      if(data.code == 1){
        this.setState({sonAccountList: data.data})
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  removeSonAccountList(sonId){
    deleteSonAccount(sonId).then(data => {
      console.log("datadata",data);
      if(data.code){
        if(data.code == 8){
          this.props.signOut();
          alert("登录失效，请重新登录");
          this.props.history.push('/login');
          return;
        }
        alert("删除成功")
      }
      this.getDataList(this.props)
    }).catch(error => {
      console.log(error)
    })
  }

  updateSonAccount(id){
    let sonA;
    for(let item of this.state.sonAccountList){
      if(id === item.username2){
        sonA = item
      }
    }
    const sonList = sonA;
    this.props.history.push('/user/sonAccountEdit', {sonList: [{...sonList}]})
  }

  render() {

    const list = this.state.sonAccountList.map((item, index) =>
      <SonAccount key={index} id={item.username2} {...item}
                  removeSonAccountList = {(sonId) => {this.removeSonAccountList(sonId)}}
                  updateSonAccountList = {(updataId) => {this.updateSonAccount(updataId)}}
      />

    )
    return (
      <div className="AddressDic">
        <div className="addDiv"><Alink className="addA" to="/user/sonAccountEdit">+新增子账号</Alink></div>
        <table className="Table">
          <thead className="Thead">
            <tr className="Tr">
              <th className="tdFirst">子账号</th>
              <th>创建时间</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    );
  }
}

SonAccountPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sonaccountpage: makeSelectSonAccountPage(),
  username: makeSelectUserName(),
  logSiteCode: makeSelectLogSiteCode(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sonAccountPage', reducer });
const withSaga = injectSaga({ key: 'sonAccountPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SonAccountPage);
