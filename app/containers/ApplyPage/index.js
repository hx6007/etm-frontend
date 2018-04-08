/**
 *
 * ApplyPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import HtmlTitle from '../../components/HtmlTitle/index';
import makeSelectApplyPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styled from 'styled-components'
import bannerImg from 'images/register/banner2.jpg';
import GetPlatform from "../../components/GetPlatform";
import {VerticalLayout,HorizontalLayout} from '../../components/Layout/index';
import ApplyForm from '../../components/ApplyForm/index';
import ApplicantList from '../../components/ApplicantList/index';
import {getRegister} from "../../utils/service";


const Body = styled(VerticalLayout)``;
const BannerImg = styled.img`
    display: block;
    width: 100%;
    height : 500px;
  `;
const MainBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 60px;
  `;
const Left = styled.div`
    flex: 5.5;
    height: auto;
    border-right: 1px dashed #afafaf;
    margin-bottom: 30px;
  `;
const LeftView = styled.div`
    display: flex;
    justify-content:flex-end;
    padding-right: 60px;
`;
const Right = styled.div`
    flex: 3.5;
    height: auto;
 `;
const RightView = styled.div`
    display: flex;
    justify-content:flex-start;
    padding-left: 60px;
  `;


export class ApplyPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state={
      list:[],
    }
    this.getRegisterlist();
  };

  //获取收货地址数据
  getRegisterlist(){
  getRegister().then(data=>{
    this.setState({
      list:data.data.user,
      count:data.data.count
    });
  }).catch(error=>{
    console.log(error);
  });
}

  render() {
    const platform = GetPlatform();
    return (
      <div>
        <HtmlTitle title={platform.name + "- 客户加盟" + platform.title} />
        <Body>
          <div>
            <BannerImg src={platform.regist_banner} alt="客户加盟"></BannerImg>
          </div>
          <MainBox>
            <Left>
              <LeftView>
                <ApplyForm history={this.props.history}></ApplyForm>
              </LeftView>
            </Left>
            <Right>
              <RightView>
                <ApplicantList registerL={this.state.list} registerCount={this.state.count}></ApplicantList>
              </RightView>
            </Right>
          </MainBox>
          {/*<ProtocolModal><Protocol src={img_protocol}></Protocol></ProtocolModal>*/}
        </Body>
      </div>
    );
  }
}

ApplyPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  applypage: makeSelectApplyPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'applyPage', reducer });
const withSaga = injectSaga({ key: 'applyPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ApplyPage);
