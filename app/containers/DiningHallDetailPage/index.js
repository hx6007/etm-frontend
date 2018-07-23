/**
 *
 * DiningHallDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {Link} from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDiningHallDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import next from 'images/next.png';
import test2 from 'images/test2.jpg';
import plugup from 'images/dinningHall/plugup.png';
import aftersale from 'images/dinningHall/aftersale.png';
import quality from 'images/dinningHall/quality.png';
import noPic from 'images/no_pic.jpg';
import styled from 'styled-components';
import Gallery from "../../components/Gallery";
import {forChoice, getDiningHallDetail, getRelated} from "../../utils/service";
import HtmlTitle from "../../components/HtmlTitle/index";
import MainHead from "../../components/MainHead/index";
import MainBottom from "../../components/MainBottom/index";

const Div = styled.div`
  width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  
`;
const HeadDiv = styled.div`
  padding: 43px 0 13px 0;
`;
const DivSecond = styled.div`
  display: flex;
  flex-direction: row;

`;

const NextImg =  styled.img`
    width: 15px;
    height: 15px;
    margin: 0 10px;
`;
const HeadSpan = styled.span`
  color: #959595;
  font-size: 13px;
`;

const DetailImg = styled.img`
  width: 100%;
`;

const DetailShow = styled.div`
  display: flex;
  background: #fff;
`;
const Describe = styled.div`
  margin-top: 35px;
  padding-left: 5px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #000;
`;

const PriceDemo = styled.div`
  margin-top: 53px;
  width: 471px;
  height: 89px;
  background: #E5EDEB;
  
`;

const PriceIn = styled.div`
  padding: 14px 0 0 26px;
`;

const PriceNow = styled.span`
  color: #278976;
  font-weight: 500;
  font-size: 36px;
`;

const PriceOld = styled.span`
  color: #959595;
  font-size: 13px;
  padding-left: 22px;
  span{
    text-decoration: line-through;
  }
`;

// const CallPhone = styled.div`
//   margin-top: 17px;
// `;
const LeftDiv = styled.div`
  width: 940px;
  margin-right: 20px;
`;

const RelatedDiv = styled(Link)`
  display: block;
  padding: 10px 19px;
`;

const DiningDetail = styled.div`
  background: #fff;
  margin-top: 20px;
  padding: 20px;
`;

const DetailBottom = styled.div`
  background: #fff;
`;

const DiningSpan = styled.div`
  color: #000;
  font-size: 18px;
  //padding-top: 32px;
`;
const Hr = styled.hr`
  border: solid 0.5px #ccc;
  margin: 20px 0;
`;
const ShowImage = styled.div`
  width: 280px;
  //height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
`;

const CanBuy = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CanBuyImg = styled.img`
  width: 130px;
  height: 130px;
`;
const CanBuyDi = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #707070;
  margin-right: 24px;
  &:nth-child(6n){
    margin-right: 0;
  }
  span{
    width: 130px;
    margin: 12px 0;
    text-align: center;
  }
`;
const RightDiv = styled.div`
  width:230px;
  text-align: center;
`;
const PromiseDiv = styled.div`
  background: #fff;
`;
const PrimSpan = styled.div`
  padding: 20px 0 0 20px;
  color: #707070;
  font-size: 15px;
  text-align: left;
`;
const HHr = styled.hr`
  border: solid 0.5px #EBEBEB;
`;
const ThImg = styled.div`
  padding: 26px 0;
  display: flex;
  flex-direction: row;
  img{
    width: 45px;
    height: 45px;
    margin-left: 20px;
  }
  div{
    display: flex;
    flex-direction: column;
    span{
      text-align: center;
      color: #B7B7B7;
      font-size: 12px;
      padding: 15px 0 0 17px;
    }
  }
`;
const BeRelated = styled.div`
  margin-top: 20px;
  background: #fff;
`;

const RelatedImg = styled.img`
  width: 190px;
  height: 120px;
  margin: 10px 0;
`

const RelatedDetail = styled.div`
  color: #707070;
  font-size: 13px;
  padding-top: 10px;
  //display: flex;
  //justify-content: center;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
`;

const DeDiv = styled.div`
  width: 464px;
  height: 308px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: solid 20px #fff;
 
`;
const SpanName = styled.span`
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  display: block;
`;
const SomeDetail = styled.p`
  padding-bottom: 20px;
  width: 920px;
`;



export class DiningHallDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super();
    this.state = {
      detail: {},
      choiceList: [],
      relatedList: [],
      imageList: []
    };
    this.getDocCode(props)
  }
  getDocCode(props){
    // console.log("sllls",props.match.params.DocCode);
    const docCode = props.match.params.DocCode;
    getDiningHallDetail(docCode).then(data => {
      if(data.code !== 1) throw '服务器错误';
      const imageList = [];
      for(let items of data.data.list){
        imageList.push(items.list)
      }

      this.setState({detail: data.data,imageList: imageList});
      getRelated(data.data.TCtype2, docCode).then(data => {
        if(data.code !== 1) throw '服务器错误';
        this.setState({relatedList: data.data})
      })
    }).catch(e => {
      console.log(e);
      alert("加载失败，请重试或联系相关人员")
    })


    forChoice(docCode).then(data => {
      if(data.code !== 1) throw '服务器错误';
      this.setState({choiceList: data.data})
    }).catch(e => {
      console.log(e);
      alert("加载失败，请重试或联系相关人员")
    });
  }



  render() {
    let images = [];
    let relatedList = [];
    const PromiseImg = [{img:quality, title: "正品保证"}, {img: aftersale, title: "无忧售后"}, {img: plugup, title: "破损补发"}]
    if(this.state.imageList !== undefined && this.state.imageList !== null){
      images = this.state.imageList
    }
    if(this.state.relatedList !== undefined && this.state.relatedList !== null){
      relatedList = this.state.relatedList;
    }
    const distinguish = "DiningHall";
    return (
      <div>
        <HtmlTitle/>
        <MainHead />
        <Div>
          <HeadDiv>
            <HeadSpan>首页</HeadSpan>
            <NextImg src={next} alt=""/>
            <HeadSpan>{this.state.detail.TCtype1}</HeadSpan>
            <NextImg src={next} alt=""/>
            <HeadSpan>{this.state.detail.TCtype2}</HeadSpan>
          </HeadDiv>
          <DivSecond>
            <LeftDiv>
              <DetailShow>
                <DeDiv>
                  <DetailImg src={this.state.detail.CodeMap||noPic} alt=""/>
                </DeDiv>
                <Describe>
                  <Title>{this.state.detail.TCname||"套餐名称"}</Title>
                  <div>{this.state.detail.TCtitle}</div>
                  <PriceDemo><PriceIn><PriceNow>￥{this.state.detail.TCprice||0}</PriceNow><PriceOld>原价：<span>￥{this.state.detail.TCYprice||0}</span></PriceOld></PriceIn></PriceDemo>
                </Describe>
              </DetailShow>
              <DiningDetail>
                <DetailBottom>
                  <DiningSpan>套餐详情</DiningSpan>
                  <Hr/>
                  <SomeDetail>
                    <pre>{this.state.detail.TCintroduce}</pre>
                  </SomeDetail>
                </DetailBottom>
                <div>
                  <CanBuy>
                    {images.map((item ,index) =>
                      <ShowImage key={index}>
                        <Gallery images = {item} distinguish = {distinguish}/>
                      </ShowImage>
                    )}
                  </CanBuy>
                </div>
                <DiningSpan>可选购商品</DiningSpan>
                <Hr/>
                <CanBuy>
                  {this.state.choiceList.map((item, index) =>
                    <CanBuyDi key={index} to={`/products/${item.sku_id}`} target="_blank">
                      <CanBuyImg src={item.CodeMap||noPic} alt=""/>
                      <SpanName>{item.MatName}</SpanName>
                    </CanBuyDi>
                  )}
                </CanBuy>
              </DiningDetail>
            </LeftDiv>
            <RightDiv>
              <PromiseDiv>
                <PrimSpan>套餐馆服务保障</PrimSpan>
                <HHr/>
                <ThImg>
                  {PromiseImg.map((item, index) =>
                    <div key={index}>
                      <img src={item.img} />
                      <span>{item.title}</span>
                    </div>
                  )}

                </ThImg>
              </PromiseDiv>
              <BeRelated>
                <PrimSpan>相关套餐</PrimSpan>
                <HHr/>
                {relatedList.map((item, index) =>
                  <RelatedDiv key={index} to={`/diningHallDetail/${item.DocCode}`} target="_blank">
                    <RelatedImg src={item.CodeMap || noPic} alt=""/>
                    <RelatedDetail>{item.TCname}</RelatedDetail>
                  </RelatedDiv>
                )}
              </BeRelated>
            </RightDiv>
          </DivSecond>
        </Div>
        <MainBottom />

      </div>

    );
  }
}

DiningHallDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dininghalldetailpage: makeSelectDiningHallDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'diningHallDetailPage', reducer });
const withSaga = injectSaga({ key: 'diningHallDetailPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DiningHallDetailPage);
