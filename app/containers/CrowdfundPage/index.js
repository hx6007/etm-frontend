/**
 *
 * CrowdfundPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Icon, Divider, DatePicker, Select,Input,Button,Pagination,Spin,message } from 'antd';
const Option = Select.Option;

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCrowdfundPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import CrowdOrderTab from "../../components/CrowdOrderTab/index";
import * as service from "../../utils/service";
import {makeSelectCustomerNo} from "../App/selectors";

const Div = styled.div`
  width: 100%;
  padding-top: 20px;
`;


const ChooseDiv = styled.div`
   width: 100%;
   padding-bottom: 20px;
  .ant-input{
  //  height: 25px;
    border-radius: 0;
  //  width: 150px;
  //
  }
  //.ant-select-selection--single{
  //  height: 27px;
  //  width: 150px;
  //}
  //.ant-select-selection__rendered{
  //  line-height: 27px;
  //
  //}
  .ant-select-selection{
    //border-radius: 0;
  } 
`;

const Spans = styled.span`
  padding-left: 20px;
`;
//
// const anoSpan = styled.span`
//   .ant-select-selection--single{
//     height: 27px;
//     //width: 80px;
//   }
//   .ant-select-selection{
//     border-radius: 0;
//   }
// `;
const Inputs = styled.input`
  height: 32px;
  width: 150px;
  background: #fff;
  border: solid #D9D9D9 1px;
  padding-bottom: 0;
`;

export class CrowdfundPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(){
    super();
    this.state = {
      startTimes: "", //开始时间
      endTimes: "", //结束时间
      selectValues:"订单编号", //单号标号编号选择
      doccode:"", //订单编号
      ZCcode:"", //众筹标号
      matcode:"", //产品编号
      docstatus:"", //状态
      crowdWay:"", //认筹方式
      list: [], //订单
      page: 1, //页数
      count: {}, //总条数
    };
  }

  componentWillMount() {
    this.borrowList({ start_time:"",end_time:"",doccode:"",ZCcode:"",matcode:"",docstatus:"",Sincetype:"",page:1 });
  }

  //分页
  pageOnChange = (page) => {
    const start_time = this.state.startTimes;
    const end_time = this.state.endTimes;
    const doccode = this.state.doccode;
    const ZCcode = this.state.ZCcode;
    const matcode = this.state.matcode;
    const docstatus = this.state.docstatus;
    const Sincetype = this.state.crowdWay;
    this.borrowList({ start_time, end_time, doccode, ZCcode, matcode, docstatus, Sincetype, page });
  }

  //点击查询
  searchOk = () =>{
    const start_time = this.state.startTimes;
    const end_time = this.state.endTimes;
    const doccode = this.state.doccode;
    const ZCcode = this.state.ZCcode;
    const matcode = this.state.matcode;
    const docstatus = this.state.docstatus;
    const Sincetype = this.state.crowdWay;
    const page = 1;
    this.borrowList({ start_time, end_time, doccode, ZCcode, matcode, docstatus, Sincetype, page });
  }


  // 我的订单列表
  borrowList = ({ start_time, end_time, doccode, ZCcode, matcode, docstatus, Sincetype, page }) => {
    const cltcode = this.props.customer_no;
    const page_size = 5;
    service.getEZCOrder({ start_time, end_time, doccode, ZCcode, matcode, docstatus, Sincetype,cltcode,page,page_size })
      .then(data => {
        if (data.code === 0) {
          throw data.message;
        }
        if (data.code === 1) {
          let BorrowInfo = data.data.list;
          let count = parseInt(data.data.count);
          this.setState({
            list: BorrowInfo,
            page: page,
            count: count,
          });
        } else {
          throw data.message;
        }
      }).catch(e => {
      message.warn('数据加载失败！');
    })
  }

  //我的订单数据遍历
  itemCard = (item,index) => {
    const { docdate,doccode,matname,matcode,ZCcode,Digit,Sincetype,stname,loan,DocStatus,totalmoney } = item;
      return(
        <div key={docdate+index} style={{ border:'1px solid #E5E5E5',width:'910px',height:'162px',marginBottom:'21px' }}>
          <div style={{ width:'908px',height:'40px',display:'flex',background:'#F0F0F0',padding:'0 0 0 16px' }}>
            <div style={{ lineHeight:'40px',color:'#787A7D' }}>{docdate}</div>
            <div style={{ lineHeight:'40px',color:'#787A7D',marginLeft:'30px' }}>订单编号：{doccode}</div>
          </div>
          <div style={{ display:'flex'}}>
            <div style={{ width:'610px',height:'121px',paddingLeft:'16px',display:'flex',paddingTop:'22px',borderRight:'1px solid #E5E5E5' }}>
              <div style={{ width:'75px',height:'75px',marginRight:'14px' }}>
                <img style={{ width:'75px',height:'75px'}} />
              </div>
              <div style={{ color:'#101010' }}>
                <div style={{ fontSize:'13px',paddingTop:'3px' }}>{matname}({matcode})</div>
                <div style={{ fontSize:'13px',paddingTop:'3px' }}>众筹标号：{ZCcode}</div>
                <div style={{ fontSize:'12px',paddingTop:'10px' }}>
                  <span style={{ padding:'0 15px 0 0' }}>数量(箱)：{Digit}</span>|
                  <span style={{ padding:'0 15px 0 15px' }}>认筹方式：{Sincetype}</span>|
                  <span style={{ padding:'0 15px 0 15px' }}>仓库：{stname}</span>|
                  <span style={{ padding:'0 0 0 15px' }}>是否贷款：{loan==="true"?"是":"否"}</span>
                </div>
              </div>
            </div>
            <div style={{ width:'130px',height:'121px',borderRight:'1px solid #E5E5E5',display:'flex' }}>
              <div style={{ margin:'auto' }}>
                <div style={{ textAlign:'center',fontSize:'13px',color:'#787A7D' }}>{DocStatus}</div>
                {/*<div style={{ textAlign:'center',fontSize:'13px',color:'#101010',paddingTop:'10px' }}>订单详情</div>*/}
              </div>
            </div>
            <div style={{ width:'170px',height:'121px',display:'flex' }}>
              <div style={{ color:'#101010',margin:'auto' }}>总额 ￥{totalmoney}</div>
            </div>
          </div>
        </div>
     );
  }


  //监听单号标号编号的input
  onChangeInputValue = (e) =>{
    if(this.state.selectValues === '订单编号') {
      this.setState({ numberValue: e.target.value, doccode: e.target.value, ZCcode:"", matcode:"" });
    }else if(this.state.selectValues === '众筹标号') {
      this.setState({ numberValue: e.target.value, ZCcode: e.target.value, doccode:"", matcode:"" });
    }else if(this.state.selectValues === '产品编号') {
      this.setState({ numberValue: e.target.value, matcode: e.target.value, doccode:"", ZCcode:"" });
    }
  }

  //开始时间
  onChangeStart(value, dateString){
    this.setState({startTimes: dateString})
  }

  //结束时间
  onChangeEnd(value, dateString){
    this.setState({endTimes: dateString})
  }

  onOk() {
  }

  //选择单号标号编号
  handleChange(values) {
    const { numberValue } = this.state;
    if (values === '订单编号') {
      this.setState({ doccode: numberValue, selectValues: values, ZCcode:"", matcode:"" })
    } else if (values === '众筹标号') {
      this.setState({ ZCcode: numberValue, selectValues: values, doccode:"", matcode:"" });
    }else if(values === "产品编号") {
      this.setState({matcode: numberValue, selectValues: values, doccode:"", ZCcode:"" })
    }
  }

  //状态
  handleChangeGoods(values){
    this.setState({docstatus: values})

  }

  //认筹方式
  handleChangeCrowd(values){
    this.setState({crowdWay: values})
  }

  render() {
    const { list,page,count } = this.state;
    console.log("list",list);
    const allNo = ["订单编号","众筹标号","产品编号"];
    // const goodStatu = ['受理中','未受理','受理完成','产销审核','财务审核','调仓中','拣货中','打托中','查货中','未备货','加工中','已备货','配送中','已完成'];
    const goodStatu = ['受理中','未受理','受理完成'];
    const crowdType = ['自提','寄存']
    const getOneNo = allNo.map(no => <Option key={no}>{no}</Option>);
    const goodStatus = goodStatu.map(statu => <Option key = {statu}>{statu}</Option>);
    const crowds = crowdType.map(crowd => <Option key={crowd}>{crowd}</Option>)
    return (
      <Div>
        <ChooseDiv style={{ paddingLeft:"6px",paddingTop:"21px" }}>
          开始日期：
          <DatePicker style={{ paddingRight:"10px",width: 140 }}
                      placeholder="年/月/日"
                      onChange={(value, dateString) => this.onChangeStart(value, dateString)}
                      onOk={this.onOk()} />
            到<DatePicker style={{ paddingLeft:"10px",width: 140 }}
                          placeholder="年/月/日"
                          onChange={(value, dateString) => this.onChangeEnd(value, dateString)}
                          onOk={this.onOk()}  />
          <Spans>
            <Select defaultValue="订单编号" onChange={(values) => this.handleChange(values)} placeholder="请选择" style={{ width:"100px" }}>
              {getOneNo}
            </Select>
            <Inputs onChange={this.onChangeInputValue} style={{ width:"140px",marginLeft:"1px",paddingLeft:"10px" }} />
          </Spans>
          <Spans>
            状态：<Select onChange={(values) => this.handleChangeGoods(values)} placeholder="请选择" style={{width: 100}}>
            {goodStatus}
          </Select>
          </Spans>
        </ChooseDiv>
        <ChooseDiv style={{ paddingLeft:"6px",paddingBottom:"25px" }}>
          众筹方式：<Select onChange={(values) => this.handleChangeCrowd(values)} placeholder="请选择" style={{width: 80}}>
          {crowds}
          </Select>
          <Spans><Button onClick={this.searchOk} style={{ width:"61px",borderRadius:"0" }}>查询</Button></Spans>
        </ChooseDiv>
        <div style={{ width:'910px',height:'40px',display:'flex',justifyContent:'space-between',background:'#F0F0F0',padding:'0 78px 0 16px',marginBottom:'21px' }}>
          <div style={{ lineHeight:'40px',color:'#787A7D' }}>订单详情</div>
          <div style={{ width:'171px',display:'flex',justifyContent:'space-between' }}>
            <div style={{ lineHeight:'40px',color:'#787A7D' }}>状态</div>
            <div style={{ lineHeight:'40px',color:'#787A7D' }}>金额</div>
          </div>
        </div>
        <div style={{ width:'910px',minHeight:'400px' }}>
          {list.map((item,index)=> this.itemCard(item,index))}
        </div>
        <div style={{ width:'910px',textAlign:'right',margin:'40px auto 0',paddingBottom:'20px' }}>
          <Pagination current={page} total={count} onChange={this.pageOnChange} pageSize={5}/>
        </div>
          {/*<CrowdOrderTab />*/}
      </Div>
    );
  }
}

CrowdfundPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  crowdfundpage: makeSelectCrowdfundPage(),
  customer_no: makeSelectCustomerNo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'crowdfundPage', reducer });
const withSaga = injectSaga({ key: 'crowdfundPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CrowdfundPage);
