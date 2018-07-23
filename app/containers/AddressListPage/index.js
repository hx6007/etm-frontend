/**
 *
 * AddressListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import saga from './saga';
import HtmlTitle from '../../components/HtmlTitle/index';
import styled from 'styled-components';
import AddressItem from "../../components/AddressItem/index";
import {Link} from 'react-router-dom';
import {getUserAddressList} from "../../utils/service";
import {delAddress} from "../../utils/service";
import {makeSelectSiteCode, makeSelectUserId} from "../App/selectors";
import { createStructuredSelector } from 'reselect';
import GetPlatform from "../../components/GetPlatform";


const AddressDic = styled.span`
  width: 100%;
  background: #F5F5F5;
  margin: 50px;
`;

const CountAddress = styled.span`
  flex: 1;
`;

const AddressO = styled.div`
  display: flex;
`;

const Alink = styled(Link)`
  text-decoration: none;
  color: #FF1D4B;
  font-size: 18px;
`;

const Thead = styled.thead`
  background: #E9E9E9;
  color: #999;
  text-align: left;
`;

const Tr = styled.tr`
  height: 50px;
  border: solid 1px #cccccc
`;

const Table = styled.table`
  width: 100%;
  border: solid 1px #cccccc;
`;

const Tbody = styled.tbody`
  color: #666;
  background: #f5f5f5;
`;

export class AddressListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state={
      list:[],
      listCount: 0,
    }
    this.getAddressList();
  }

  //获取收货地址数据
  getAddressList(){
    const {user_id,siteCode} =this.props;
    getUserAddressList(siteCode,user_id).then(data=>{
      if (data.code !== 1){
        console.log(data);
        if(data.code == 8){
          this.props.signOut();
          alert("登录失效，请重新登录");
          this.props.history.push('/login');
          return;
        }
        alert(" 服务器数据错误,请稍后刷新再查看！");
        this.setState({loadingStatus:3});
        return
      }
      this.setState({
        list:data.data,
        listCount: data.data.length

      })
    }).catch(error=>{
      console.log(error);
    })
  }

  //删除地址列表
  removeAddressList(r){
    // console.log(r);
    delAddress(r).then(data=>{
      alert(`删除地址列表${data.message}了`)
      if (data.code !== 1){
        console.log(data);
        if(data.code == 8){
          this.props.signOut();
          alert("登录失效，请重新登录");
          this.props.history.push('/login');
          return;
        }
        alert(" 服务器数据错误,请稍后刷新再查看！");
        this.setState({loadingStatus:3});
        return
      }
      this.getAddressList();
    }).catch(error=>{
      console.log(error);
    })
  }

  //修改地址列表
  updateAddressList(id){
    let addr;
    for(let item of this.state.list){
      if(id === item.id){
        addr=item;
      }
    }
    const addresslist = addr;
    this.props.history.push('/user/addressEdit',{addresslist:[{...addresslist}]});
  }

  render() {
    const platform = GetPlatform();
    const list = this.state.list.map((item) =>
      <AddressItem key={item.id} id={item.id} {...item}
                   removeAddressList = {(addId) =>{this.removeAddressList(addId)}}
                   updateAddressList = {(updateId)=>{this.updateAddressList(updateId)}}
      />
    );
    return (
      <AddressDic>
        <HtmlTitle title={platform.name + "- 收货地址列表"} />
        <AddressO>
          <CountAddress>您已经创建了{this.state.listCount}个收货地址</CountAddress>
          <Alink to="/user/addressEdit">+新增收货地址</Alink>
        </AddressO>
        <Table>
          <Thead>
            <Tr>
              <th>收货人</th>
              <th>手机</th>
              <th>固定电话</th>
              <th>收货地址</th>
              <th>操作</th>
              <th>#</th>
            </Tr>
          </Thead>
          <Tbody>
            {list}
          </Tbody>
        </Table>
      </AddressDic>
    );
  }
}

AddressListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

const mapStateToProps = createStructuredSelector({
  user_id:makeSelectUserId(),
  siteCode: makeSelectSiteCode(),
});

const withConnect = connect(mapStateToProps);
const withSaga = injectSaga({ key: 'addressListPage', saga });


export default compose(
  withSaga,
  withConnect,
)(AddressListPage);
