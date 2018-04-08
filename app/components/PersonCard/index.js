/**
*
* PersonCard
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectUserId} from "containers/App/selectors";
import styled from 'styled-components';
import 'url-search-params-polyfill';
import ceshi from 'images/ceshi.jpg';
import {getUserInfo} from "../../utils/service";



const Div = styled.div`
  padding-top: 20px;
`;
const Tipspan = styled.span`
  display:inline-block;
  width:110px;
  margin-left:20px;
  font-size:18px;
  color:#666666;
  text-aline:left;
`
const PerLabel = styled.label`
  padding-left: 50px;
  font-weight: bold;
  color:#666666;
  font-weight:normal;
  font-family:"微软雅黑";
  font-size:19px;
`;

const ImgList = styled.img`
  width: 100px;
  height: 100px;
  padding-right: 10px;
`;

const Tips = styled.div`
  background: #F9F2F4;
  margin-bottom:20px;
  margin-left:20px;
`;

const TipsTitle = styled.span`
  font-weight: bold;
  color: #C7264E;
  font-size: 18px;
  font-weight: normal;
`;

const TipsDetail = styled.span`
  font-weight: bold;
  font-size: 18px;
  font-weight: normal;
`;

export class PersonCard extends React.Component{

  constructor(props){
    super()
    this.state = {
      personList: []
    };
    this.loadList(props)
    // const {user_id}=props;
  }

  loadList(props){
    getUserInfo(props.user_id).then(data => {
      if (data.code !== 1){
        if(data.code == 8){
          this.props.signOut();
          alert("登录失效，请重新登录");
          this.props.history.push('/login');
          return;
        };
        throw '服务器数据错误' + data.message;
      }
      let personList = data.data;
      this.setState({personList: personList})

      }
    )
  }

  render(){
    const item = this.state.personList;
    return (
      <Div>
        <p><Tipspan>会员编号：</Tipspan><PerLabel>{item.customer_no}</PerLabel></p>
        <p><Tipspan>用户名称：</Tipspan><PerLabel>{item.name}</PerLabel></p>
        <p><Tipspan>手机号码：</Tipspan><PerLabel>{item.mobile}</PerLabel></p>
        <p><Tipspan>所在地区：</Tipspan><PerLabel>{item.province}/{item.city}/{item.district}</PerLabel></p>
        <p><Tipspan>会员身份：</Tipspan><PerLabel>{item.customer_grade}</PerLabel></p>
        <p><Tipspan>联系人：</Tipspan><PerLabel>{item.username}</PerLabel></p>
        <p><Tipspan>固定电话：</Tipspan><PerLabel>{item.head_mobile}</PerLabel></p>
        <p><Tipspan>详细地址：</Tipspan><PerLabel>{item.address}</PerLabel></p>
        <div><Tipspan>图片资料：</Tipspan><ImgList src={ceshi}></ImgList><ImgList src={ceshi}></ImgList><ImgList src={ceshi}></ImgList></div>
        <Tips><TipsTitle>温馨提示：</TipsTitle><TipsDetail>如果您有需改资料的需求请联系业务员</TipsDetail></Tips>
      </Div>
  )


}

}

PersonCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user_id: makeSelectUserId(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(PersonCard);

