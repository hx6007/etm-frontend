/**
 *
 * PerOrderDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Steps,Icon,Menu } from 'antd';
const Step = Steps.Step;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import shose from 'images/test2.jpg';


import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPerOrderDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';


const DeDiv = styled.div`
  margin-top: 20px;
  background: #fff;
`;

const DeStep = styled.div`
  background: #F0F0F0;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 10px 0 15px 0;
  border: solid 1px #F6F6F6;
  .ant-steps-item-icon, .ant-steps-item-content{
    display: block;
    
  }
  .ant-steps-item-custom .ant-steps-item-icon{
    width: 25px;
    height: 25px;
  }
  .ant-steps-item-title{
    font-size: 13px;
    line-height: 20px;
    padding-left: -2px;

  }
  .ant-steps-item-custom .ant-steps-item-icon > .ant-steps-icon{
    left: 14.5px;
  }
  .ant-steps-item-finish > .ant-steps-item-content > .ant-steps-item-title{
    color: #009B3A;
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: #009B3A;
  }
  .ant-steps-item-finish > .ant-steps-item-content > .ant-steps-item-title:after{
    background-color: #009B3A;
  }
`;
const SteSpan = styled.span`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  
`;

const OrderNo = styled.span`
  font-weight: 500;
`;

const DetailLink = styled(Link)`
  border: solid 1px #D7D7D7 ;
  color: #4B4B4B;
`;
const OrderNa = styled.div`
  display: flex;
  justify-content: space-between;  
`;
const TimeColor = styled.span`
  color: #7B7E81;
`;
const StepShow = styled.div`
  padding: 0 20px;
  .ant-menu-submenu > .ant-menu{
    background-color: #fff;
  }
`;
const SomeTips =  styled.span`
  font-size: 15px;
  font-weight: bold;
`;
const PerCard = styled.div`
  background: #F8F8F8;
  width: 100%;
  margin-top: 20px;
  padding: 20px;
`;
const OneCard = styled.div`
  height: 50px;
  border-bottom: solid 1px #F3F3F3;
`;
const OneName = styled.span`
  padding-right: 130px;
`;
const DetailC = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 20px 0;
`;
const SpanP = styled.span`
  display: flex;
  flex-direction: column;
`;
const Spans = styled.span`
  padding-bottom: 15px;
`;
const ShowOrHide = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Ul = styled.ul`
  padding-top: 20px;
`;


const Tables = styled.table`
  width: 100%;
  margin: 15px 0;
  border: solid 1px #F6F6F6;
`;

const Thead = styled.thead`
  background: #E9E9E9;
  color: #999;
`;

const Tr = styled.tr`
  width: 100%;
  //text-align: left;
  height: 40px;
`;
const SmallImg = styled.img`
  height: 35px;
  width: 35px;
`;
const ThLeft = styled.th`
  padding-left: 10px;
`;
const Td = styled.td`
  border-bottom: solid #F2F2F2 1px;
  padding: 10px 0 10px 10px;
`;
const DivPrice = styled.div`
  text-align: right;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 10px 0;
`;
const DDD = styled.div`
  display: flex;
  border-bottom: dashed #cccccc 1px;
  padding-bottom: 20px;
  width: 253px;
  justify-content: flex-end;

`;
const SpanPrice = styled.span`
  margin-left: 50px;
  padding-top: 10px;
`;
const SpanBig = styled.span`
  display: flex;
  flex-direction: column;
  
`;
const SpanTips = styled.span`
  text-align: right;
  padding-top: 10px;
`;



export class PerOrderDetailPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(){
    super();
    this.state = {
      displays : "block"
    }
  }

  showOrHide(){
    console.log("ssss");
    if(this.state.displays === "none"){
      this.setState({displays: "block"})
    }else{
      this.setState({displays: "none"})

    }
  }

  render() {
    const tipsOne=<SteSpan>
        <span>提交订单</span>
        <TimeColor>2018-4-18</TimeColor>
        <TimeColor>09:48:45</TimeColor>
      </SteSpan>;
    const tipStatus = <span>2018-02-24 <span>您的订单已完成，感谢您对楼兰的支持，欢迎再次光临。</span></span>
    return (
      <DeDiv>
        <OrderNa>
          <span>订单：<OrderNo>OR2018042812402110167-1</OrderNo></span>
          <DetailLink to="../../user/perOrderList"><Icon type="arrow-left" />返回</DetailLink>
        </OrderNa>
        <DeStep>
          <Steps>
            <Step status="finish" title={tipsOne} icon={<Icon type="check-square" />} />
            <Step status="finish" title={tipsOne} icon={<Icon type="pay-circle" />} />
            <Step status="finish" title={tipsOne} icon={<Icon type="folder" />} />
            <Step status="wait" title={tipsOne} icon={<Icon type="car" />} />
            <Step status="wait" title={tipsOne} icon={<Icon type="check-circle" />} />
          </Steps>
        </DeStep>
        <StepShow>
          <ShowOrHide>
            <SomeTips>当前状态：已完成</SomeTips>
            <span style={{color: '#336097'}} onClick={() => this.showOrHide()}>收起{this.state.displays === "block" ? <Icon type="up" /> : <Icon type="down" /> }</span>
          </ShowOrHide>
          <Ul style={{display: `${this.state.displays}`}}>
            <Steps progressDot direction="vertical" size="small" current={1}>
              <Step title={tipStatus} />
              <Step title={tipStatus} />
              <Step title={tipStatus} />
            </Steps>
          </Ul>
        </StepShow>
        <PerCard>
          <OneCard>
            <OneName>收货人：陈姐（13642982458）</OneName>
            <span>收货地址：广东省东莞市，万江街道胜利管理区爱迪花园6栋401</span>
          </OneCard>
          <DetailC>
            <SpanP>
              <Spans>提货仓库：楼兰家居洞边仓（108）</Spans>
              <span>是否延迟发货：是</span>
            </SpanP>
            <SpanP>
              <Spans>提货类型：代办物流</Spans>
              <span>延迟发货日期：2018-05-31</span>
            </SpanP>
            <SpanP>
              <Spans>是否指定物流点：否</Spans>
              <span>货款类型：正常货款</span>
            </SpanP>
            <SpanP>
              <Spans>是否打托：否</Spans>
            </SpanP>
          </DetailC>
        </PerCard>
        <div>
          <Tables>
            <Thead>
              <Tr>
                <ThLeft>商品信息</ThLeft>
                <ThLeft>单价</ThLeft>
                <ThLeft>数量</ThLeft>
              </Tr>
            </Thead>
            <tbody>
              <Tr>
                <Td><SmallImg src={shose}/>楼兰 苍古香楠 苍古香楠 150x900 AAA</Td>
                <Td>￥10.67</Td>
                <Td>x1</Td>
              </Tr>
              <Tr>
                <Td><SmallImg src={shose}/>楼兰 苍古香楠 苍古香楠 150x</Td>
                <Td>￥10.67</Td>
                <Td>x1</Td>
              </Tr>
            </tbody>
          </Tables>
        </div>
        <DivPrice>
          <DDD>
            <SpanBig>
              <SpanTips>打托费：</SpanTips>
              <SpanTips>加工费：</SpanTips>
              <SpanTips>应收金额：</SpanTips>
            </SpanBig>
            <SpanBig>
              <SpanPrice>+￥10.00</SpanPrice>
              <SpanPrice>+￥10.00</SpanPrice>
              <SpanPrice>&nbsp;￥21.34</SpanPrice>
            </SpanBig>
          </DDD>
        </DivPrice>
          <DivPrice>
            <span>
              <SpanTips>商品总额：</SpanTips>
              <SpanPrice>&nbsp;￥21.34</SpanPrice>
            </span>

          </DivPrice>
      </DeDiv>
    );
  }
}

PerOrderDetailPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  perorderdetailpage: makeSelectPerOrderDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'perOrderDetailPage', reducer });
const withSaga = injectSaga({ key: 'perOrderDetailPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PerOrderDetailPage);
