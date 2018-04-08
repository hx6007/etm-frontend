/**
 *
 * DiningHallPage
 *
 */

import React from 'react';
import {Pagination, LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {getDiningHallList} from "../../utils/service";

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDiningHallPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import DiningItem from "../../components/DiningItem/index";
import ListContainer from "../ProductListPage/ListContainer";
import banner from 'images/dinningHall/banner.png';
import next from 'images/next.png';
import HtmlTitle from "../../components/HtmlTitle/index";
import MainHead from "../../components/MainHead/index";
import MainBottom from "../../components/MainBottom/index";


const Iimage = styled.img`
  width: 100%;
  padding-bottom: 28px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  .ant-pagination-item-active a{
    color: #278976;
  }
  .ant-pagination-item-active {
    border-color: #278976;
    font-weight: 500;
  }
  .ant-pagination-item:focus a, .ant-pagination-item:hover a {
    color: #278976;
  }
  .ant-pagination-item:focus, .ant-pagination-item:hover {
    -webkit-transition: all .3s;
    transition: all .3s;
    border-color: #278976;
  }
  .ant-pagination-prev:focus .ant-pagination-item-link, .ant-pagination-next:focus .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link, .ant-pagination-next:hover .ant-pagination-item-link {
    border-color: #278976;
    color: #278976;
  }
  .ant-pagination-jump-prev:focus:after, .ant-pagination-jump-next:focus:after, .ant-pagination-jump-prev:hover:after, .ant-pagination-jump-next:hover:after {
    color: #278976;
    display: inline-block;
    font-size: 12px;
    -webkit-transform: scale(0.66666667) rotate(0deg);
    -ms-transform: scale(0.66666667) rotate(0deg);
    transform: scale(0.66666667) rotate(0deg);
    letter-spacing: -1px;
  }

`;

const SmallTitle = styled.div`
  width: 1200px;
  margin: auto;
  padding-top: 43px;
`;

const SmallSpan = styled.span`
  color: #959595;
  font-size: 13px;
`;

const SmallImg = styled.img`
  width: 15px;
  height: 15px;
  margin: 0 10px;
`;

const Nodata = styled.div``;



export class DiningHallPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super();
    this.state = {
      HinnigList: [],
      TCtype1: "",
      TCtype2: "",
      totalCount: 0,
      pageNo: 1
    };
    this.getList(props)
  }

  goPage(pageNumber){
    this.getList(this.props,pageNumber);
  }


  getList(props,pageNumber){
    const pageNo = pageNumber||1;
    const tcType = props.match.params.List;
    getDiningHallList(pageNo,tcType).then(data => {
      if(data.code !== 1) throw  '服务器数据错误';
      if(data.data.list.length < 1) return;
      this.setState({
        HinnigList: data.data.list,
        TCtype1: data.data.list[0].TCtype1,
        TCtype2: data.data.list[0].TCtype2,
        totalCount: data.data.totalCount
      })
    }).catch(e => {
      console.log(e);
      alert('加载出错')
    })
  }


  render() {
    const HeadPic = this.props.match.params.List !== undefined;
    let HiningList;
    if(!HeadPic){
      HiningList = this.state.HinnigList.slice(0,9);
    }else{
      HiningList = this.state.HinnigList
    }
    return (
      <div>
        <HtmlTitle/>
        <MainHead />
        {!HeadPic ?  <Iimage src={banner} alt=""/>
        : <SmallTitle>
            <SmallSpan>首页</SmallSpan>
            <SmallImg src={next} alt=""/>
            <SmallSpan>{this.state.TCtype1}</SmallSpan>
            {!this.state.TCtype1 ? <SmallSpan>{this.props.match.params.List}</SmallSpan> : <SmallImg src={next} alt=""/>}
            <SmallSpan>{this.state.TCtype2}</SmallSpan>
          </SmallTitle>
        }
        {
          HiningList.length > 0 ? <ListContainer>
            {HiningList.map((item, index) =>
              <DiningItem key={index} price = {item.TCprice} oldPrice = {item.TCYprice} TCname={item.TCname} TCtitle={item.TCtitle} picture={item.UNID} docCode={item.DocCode} file_key={item.CodeMap}  />
            )}
          </ListContainer> :
            <SmallTitle>此分类下暂无数据</SmallTitle>
        }


        {HeadPic && <LocaleProvider locale={zhCN}>
          <Div>
            <Pagination showQuickJumper defaultCurrent={1} defaultPageSize={9} showTotal={total => `共${total}个套餐`} total={this.state.totalCount} onChange={this.goPage.bind(this)} />
          </Div>
        </LocaleProvider>}
        <MainBottom />

      </div>
    );
  }
}

DiningHallPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dininghallpage: makeSelectDiningHallPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'diningHallPage', reducer });
const withSaga = injectSaga({ key: 'diningHallPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DiningHallPage);
