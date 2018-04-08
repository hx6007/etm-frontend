/**
 *
 * OrderSubmitPage
 *
 */

import React from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MainHead from "../../components/MainHead";
import MainBottom from "../../components/MainBottom";
import {Body} from "../../components/Layout";
import styled from 'styled-components';
import CartItem from "../../components/CartItem";
import {
  makeSelectCustomerNo, makeSelectSiteCode, makeSelectUserId, makeSelectUserName,
  makeSelectWarehouse
} from "../App/selectors";
import {createStructuredSelector} from "reselect";
import Noimg from './Noimg.jpg';
import {Link} from "react-router-dom";
import {createOrder, delCart, getUserAddressList, getUserInfo} from "../../utils/service";
import moment from 'moment';
import {Spin,DatePicker } from 'antd'
import {signOutAction} from "../App/actions";


const { MonthPicker, RangePicker } = DatePicker;
const Title = styled.p`
  flex:3;
  font-size:16px;
  color:#4C5D76;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;
const OtherTitle = styled.h3`
  line-height:30px;
  font-size:16px;
  color:#4C5D76;
`;
const IndentList = styled.div`
  width:1200px;
  margin:0 auto;
  margin-bottom:20px;
`;
const Label = styled.label`
  display:inline-block;
  height:40px;
  line-height:40px;
  font-size:14px;
  color:#4C5D76;
`;
const InputD = styled.input`
  margin-left:10px;
  height:35px;
  border:1px solid #ccc;
`;
const LabelS =styled(Label)`
  margin-left:20px;
  display:${props => props.show? 'inline-block' : 'none'};
`;
const Table = styled.table`
  font-size: 30px;
  display:${props => props.show? 'inline-block' : 'none'};
`;
const Textarea = styled.textarea`
  width:300px;
  height:60px;
  border:1px solid #ccc;
`;

const NeedPay = styled.div`
  font-size:22px;
`;
const Money = styled.i`
  display: inline-block;
  margin: 0 10px;
  font-style: normal;
  font-size:24px;
  color:rgb(197,34,66);
`;
// styled
const PageTitle = styled.h3`
  width:1200px;
  margin:30px auto;
  font-size:24px;
  color:#666666;
  text-align: center;
`;
const IndentTr = styled.div`
  display:flex;
  width:1200px;
  height:55px;
  font-size:0;
  text-align: center;
  border-bottom:2px solid rgb(197,34,66);
`;
const Account = styled(IndentTr)`
  display:flex;
  flex-direction: row-reverse;
  border-bottom:0;  
  border-top:2px solid rgb(197,34,66);
`;
const IndentTh = styled.span`
  flex:1;
  line-height:55px;
  font-size:16px;
  color:#4C5D76;
`;
const IndentTd = styled(IndentTh)`
  line-height:100px;
  font-size:16px;
  color:#4C5D76;
`;
const IndentThMsg = styled(IndentTh)`
  display:flex;
  flex:2;
  font-size:16px;
  color:#4C5D76;
`;
const Tr = styled(IndentTr)`
  height:100px;
  border-bottom:1px dashed #ccc ;  
`;
const Image = styled.img`
  flex:1;
  margin:10px;
  width:80px;
  height:80px;
  max-height:80px;
`;

const Buttons =styled.button`
  background: crimson;
  padding: 8px 25px ;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
   &:hover,&:focus,&:active {
    opacity: 0.9;
  }
`;
const SumButton = styled(Buttons)`
  background: #ccc;
`;
const TableTr = styled.tr`
  width: 100%;
  border-bottom: 0.8px solid #ccc;
  border-top: 0.8px solid #ccc;
  text-align: left;
  line-height: 3;
`;
const TableTd = styled.td`
  padding-left:10px;
`;
const Tables = styled.table`
  width:1200px;
  margin:20px auto;
  font-size: 14px;
  color: #635F5F;
`;
const AddAddress = styled(Link)`
  background: crimson;
  padding: 8px 25px ;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
   &:hover,&:focus,&:active {
    opacity: 0.9;
  }
`;
const Inputs = styled.input`
  width: 300px;
  border-bottom: 1px solid #000;
`;
const CostomerMessage = styled.div`
  font-size: 16px;
  color: #635F5F;
`;

export class OrderSubmitPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super();
    this.state={
      productList:[],    //前一步获取的商品列表信息
      logistics:false,  // 物流的选择方式 false是代办物流，true是自提
      logisticsTime:'',  // 自提时间
      consignment:true,   // 是否延迟发货 false是不需要，true是需要
      consignmentTime:'', //延迟发货时间
      payJoy:true,       // 是否打托 false是不需要，true是需要
      remark:'',         //备注
      loadingStatus:1,//加载状态 1 加载完成 2 加载中 3 加载失败
      addressList: [], //地址列表
      checkeId: null,  //选择的地址Id
      modalVisible: false, //是否展示模态框
      noClick: 0,//点击订单按钮后是否禁用
    };
    // console.log(props.UserName,this.state.user_name);
    const { match,history,location,user_id}=props;
    const productList=location.state&&location.state.productList;
    if(!user_id){
      history.goBack();
      alert('您尚未登录！');
      return;
    }
    if(productList&&productList.length>0){
      this.state.productList=productList;
    }else {
      history.goBack();
      alert('您尚未提交商品！');
      return
    }
    this.getAddressList(props);
  };
  //删除商品
  alldel = () => {
    let removeList = [];
    for(const item of this.state.productList){
      if(!item.cartId){
        return;
      }
      removeList.push(item.cartId);
    }
    delCart(removeList.toString()).then( data => {
      if(data.code === 1){
        console.log("购物车删除成功！");
        this.getWebCart();
        this.setState({del:true});
      }else {
        console.log(data);
        throw data;
      }
    }).catch(error => {console.log(error)});
  };

  submit(){
    let is_delay_shipment = this.state.consignment ? '是' : '否';
    let delay_shipment_time = this.state.consignment ? this.state.consignmentTime : "";

    let address_id;
    if(this.state.logistics == false){
      address_id = this.state.checkeId;
      if(address_id == null){
        alert("请选择或添加地址");
        return ;
      }

    }
    const memo = this.state.remark;
    const is_pallet = this.state.payJoy ? '是' : '否';
    const logistics = this.state.logistics ? "自提" : "代办物流" ;
    let pick_date = this.state.logisticsTime ? this.state.logisticsTime : "";
    let order_goods = [];
    for(const item of this.state.productList ){
      order_goods.push({
        sku_id : item.id,
        warehouse : item.warehouse,
        count : item.count,
        goods_name : item.title,
        goods_thumb :item.images[0],
        face_price : item.priceFace,
        price: item.userPrice,
        unit: item.base_unit,
        grades: item.level,
        special:item.spec,
        goods_code:item.product_no,
        special_supply:item.is_special_supply,
      });
    }
    const {user_id,siteCode,customer_no,UserName,history}=this.props;
    if (is_delay_shipment === "是" && delay_shipment_time === ''){
      alert("请选择延迟发货时间！");
      this.setState({loadingStatus:3});
      return ;
    }
    let order_params = {
      "site_code":this.props.siteCode,
      "user_id" : user_id,
      "address_id" : address_id,
      "is_pallet" : is_pallet,
      "is_delay_shipment" : is_delay_shipment,
      "delay_shipment_time" : delay_shipment_time,
      "memo" : memo,
      "logistics" : logistics,
      "pick_date" : pick_date,
      "order_goods" : order_goods
    }
    // console.log(JSON.stringify(order_params))
    const noCli = this.state.noClick+1;
    this.setState({noClick: noCli})
    if(noCli>1) {alert("您已提交订单请耐心等待")}else{
      createOrder(order_params).then(data => {
        if (data.code !== 1){
          console.log(data);
          if(data.code == 8){
            this.props.signOut();
            alert("登录失效，请重新登录");
            this.props.history.push('/login');
            return;
          }
          throw (data);
          this.setState({loadingStatus:3});
          return
        }
        this.setState({loadingStatus:1});
          this.alldel();
        alert("提交订单成功！");
        history.replace('/')
      }).catch( error => {
        console.log(error);
        alert("提交订单失败！");
        this.setState({noClick: 0,loadingStatus:3});
      });
    }

  }
  getConData(e) {
    if (e != null) {
      const getDate =  e._d;
      const consignmentTime = getDate.getFullYear().toString() + "-" + (getDate.getMonth()+1).toString() + "-" + getDate.getDate().toString();
      this.setState({consignmentTime: consignmentTime});
      return
    }
    this.setState({consignmentTime:""});
  }

  getLogisticsTime(e) {
    if (e != null) {
      console.log("e => ", e);
      const getDate =  e._d;
      const logisticsTime = getDate.getFullYear().toString() + "-" + (getDate.getMonth()+1).toString() + "-" + getDate.getDate().toString();
      this.setState({logisticsTime: logisticsTime});

      return
    }
    this.setState({logisticsTime:""});
  }

  getAddressList(props){
    const { siteCode,user_id}=props;
    getUserAddressList(siteCode, user_id).then(data => {
      if(data.code=== 1){
        const check = data.data[0].id;
        this.setState({addressList: data.data,checkeId: check});
      }else{
        console.log(data)
        throw "服务器数据错误"
      }
    }).catch(error => {
      console.log(error)
    })
  }

  onChange(e){
    const checkedIds = e.target.value;
    this.setState({checkeId: checkedIds});

  }

  getRemask(e) {
    const remark = e.target.value;
    this.setState({remark:remark});
  }
  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }

  render() {

    const list =this.state.productList.map((item,index) =>
      <Tr key = {index}>
        <IndentThMsg>
          <Image src={item.images&&item.images[0] || Noimg}/>
          <Title>{item.title}</Title>
          </IndentThMsg>
          <IndentTd>{parseFloat(item.userPrice).toFixed(2)}</IndentTd>
          <IndentTd>{parseInt(item.count)}</IndentTd>
          <IndentTd>{ (parseFloat(item.userPrice) * parseInt(item.count)).toFixed(2)}</IndentTd>
      </Tr>
    );
    let price= 0;
    for(const item of this.state.productList){
      price+=parseFloat(item.userPrice) * parseInt(item.count)
    }
    price=price.toFixed(2);

    const addressLists = this.state.addressList.map((item, index) =>
      <tbody key={index}>
        <TableTr >
          <TableTd><input type="radio" name="name" onChange={this.onChange.bind(this)} value={item.id} checked={item.id == this.state.checkeId} /></TableTd>
          <TableTd>{item.consignee}</TableTd>
          <TableTd>{item.phone_number}</TableTd>
          <TableTd>{item.telephone}</TableTd>
          <TableTd>{item.address}</TableTd>
        </TableTr>
      </tbody>
    )

    return (
      <div>
        <MainHead />
        <Body>
          <PageTitle>提交订单</PageTitle>
          <IndentTr>
            <IndentThMsg>商品信息</IndentThMsg>
            <IndentTh>单价(元)</IndentTh>
            <IndentTh>数量</IndentTh>
            <IndentTh>小计</IndentTh>
          </IndentTr>
          <IndentList>
            {list}
          </IndentList>
          <IndentList>
            <OtherTitle>物流方式：<AddAddress to="/user/addressEdit" target="_blank">增加新地址</AddAddress></OtherTitle>
            <Label><input type="radio" name="transport" onChange={e=>{}} defaultChecked  onClick={ e => {this.setState({logistics:false});}}/>&nbsp;代办物流</Label>&nbsp;&nbsp;&nbsp;&nbsp;
            <Label><input type="radio" name="transport" onChange={e=>{}}  onClick={ e => {this.setState({logistics:true})}}/>&nbsp;自提</Label>
            {/*<LabelS show={this.state.logistics}><InputD type="date" id='logisticsTime' min="2017-04-01"  onChange={e => {this.getLogData(e)}}/></LabelS>*/}
            {this.state.logistics == true ? <LabelS show={this.state.logistics}><DatePicker
              format="YYYY-MM-DD"
              disabledDate={this.disabledDate}
              showToday={false}
              placeholder={"年/月/日"}
              style={{margin:"0 0 0 5px"}}
              onChange={e => {this.getLogisticsTime(e)}}
            /></LabelS> : <Tables>
              {addressLists}
            </Tables> }
          </IndentList>
          <IndentList>
            <OtherTitle>是否打托：</OtherTitle>
            <Label><input type="radio" name="datuo" onChange={e=>{this.setState({payJoy:true})}} defaultChecked />&nbsp;需要</Label>&nbsp;&nbsp;&nbsp;&nbsp;
            <Label><input type="radio" name="datuo" onChange={e=>{this.setState({payJoy:false})}}/>&nbsp;不需要</Label>
          </IndentList>
          <IndentList>
            <OtherTitle>是否延迟发货：</OtherTitle>
            <Label><input type="radio" name="delay" defaultChecked onChange={e=>{}} onClick={ e => {this.setState({consignment:true})}}/>&nbsp;需要</Label>&nbsp;&nbsp;&nbsp;&nbsp;
            <Label><input type="radio" name="delay" onChange={e=>{}} onClick={ e => {this.setState({consignment:false})}}/>&nbsp;不需要</Label>
            <LabelS show={this.state.consignment}><DatePicker
              format="YYYY-MM-DD"
              disabledDate={this.disabledDate}
              showToday={false}
              placeholder={"年/月/日"}
              style={{margin:"0 0 0 5px"}}
              onChange={e => {this.getConData(e)}}

            /></LabelS>

          </IndentList>
          <IndentList>
            <OtherTitle onChange={e => {this.setState({remark:e.target.value})}}>备注：</OtherTitle>
            <Textarea onChange={e => {this.getRemask(e)}} />
          </IndentList>
          <Account>
            <NeedPay>实付款：￥<Money>{price}</Money>元</NeedPay>
          </Account>
          {
             this.state.noClick>=1 ? <SumButton>提交订单</SumButton>:
          <Buttons onClick={e=>{this.state.loadingStatus!==2&&this.submit()}}>提交订单{this.state.loadingStatus===2&&<Spin />}</Buttons>
          }
        </Body>
        <MainBottom />
      </div>
    );
  }
}

OrderSubmitPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  user_id:makeSelectUserId(),
  siteCode: makeSelectSiteCode(),
  customer_no:makeSelectCustomerNo(),
  warehouse:makeSelectWarehouse(),
  UserName:makeSelectUserName()
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signOut:()=>dispatch(signOutAction())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(OrderSubmitPage);
