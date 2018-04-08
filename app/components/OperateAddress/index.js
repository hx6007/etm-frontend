/**
*
* OperateAddress
*
*/

import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {VerticalLayout, HorizontalLayout} from '../../components/Layout/index';
import { Cascader } from 'antd';
import {addAddress} from '../../utils/service.js';
import {makeSelectSiteCode, makeSelectUserId} from "../../containers/App/selectors";
import { createStructuredSelector } from 'reselect';
import connect from "react-redux/es/connect/connect";
import compose from "redux/es/compose";
import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';
import {updateAddress} from "../../utils/service";

const PerDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  color: #666;
  font-size: 16px;
  padding-top: 10px;
`;

const Select = styled.select`
 width: 80px;
 border: 1px solid #ccc;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  margin-left: 15px;
  height: 30px;
  text-indent: 0.7em;
  font-size: 15px;
`;

const AreaSpan = styled.span`
  .ant-cascader-picker{
    display:inline-block;
    width:300px;
    margin-left:14px;
  }
`;

const AlinkBtn = styled.span`
  background: #E5281D;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  width: 100px;
  border-shadow: 1px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Back = styled.button`
  background: #DAE4D8;
  color: #fff;
  font-size: 15px;
  height: 30px;
  margin-left: 20px;
`;

const Alink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Span = styled.span`
  color: #FC231C;
`;
const ErrorTips = styled.div`
    height: 20px;
    padding-left: 13px;
    color: #e72b06;
    font-size: 16px;
    font-weight: normal;
  `;
const OptionView = styled(HorizontalLayout)`
    padding-left: 30px;
  `;
const TextInput = styled.input`
    display: block;
    width: 100%;
    height: 34px;
    line-height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    color: #555;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px rgba(0,0,0,0.075);
    -webkit-box-shadow: inset 0 1px rgba(0,0,0,0.075);
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  `;



class OperateAddress extends React.Component{
  constructor(props){
    super(props);
    if(props.addEdit===undefined){
      this.state = {
        consignee:"",
        telPhone:"",
        landLinePhone:"",
        area:[],
        province:"",
        city:"",
        district:"",
        detailAddress:"",
        postalCode:"",
        defaultAddressStatus:false,
        consigneeError:"",
        areaError:"",
        consigneeError:"",
        detailAddressError:"",
        postalCodeError:"",
        status:"add",
      };
    }else{
      this.state = {
        consignee:props.addEdit[0].consignee,
        telPhone:props.addEdit[0].phone_number,
        landLinePhone:props.addEdit[0].telephone,
        area:[props.addEdit[0].province, props.addEdit[0].city, props.addEdit[0].district],
        province:props.addEdit[0].province,
        city:props.addEdit[0].city,
        district:props.addEdit[0].district,
        detailAddress:props.addEdit[0].address,
        postalCode:props.addEdit[0].zipcode,
        defaultAddressStatus:(props.addEdit[0].isflag==="true"),
        consigneeError:"",
        areaError:"",
        consigneeError:"",
        detailAddressError:"",
        postalCodeError:"",
        status:"update",
        addressListId:props.addEdit[0].id,
      };
    }
    // console.log("-------->",props.addEdit);
  }
  /**
   * 监听表单中的数据，保存到state中
   */
  onInput(key,value){
    this.setState({
      [key]:value
    })
  }

  //点击保存按钮，执行对数据的验证等方法
  handleClick=(event)=>{
    let result;
    if(!this.state.consignee){
      result = false;
      this.setState({
        consigneeError:"* 必填框不能为空！",
      })
    }else if(!this.state.telPhone){
      result = false;
      this.setState({
        telPhoneError:"* 必填框不能为空！",
      })
    }else if(this.state.area===undefined || this.state.area.length<=0){
      // console.log("area",this.state.area)
      result = false;
      this.setState({
        areaError:"* 必填框不能为空！",
      })
    }else if(!this.state.detailAddress){
      result = false;
      this.setState({
        detailAddressError:"* 必填框不能为空！",
      })
    // }else if(!this.state.postalCode){
    //   result = false;
    //   this.setState({
    //     postalCodeError:"* 必填框不能为空！",
    //   })
    }else {
      result = true;
    }
    if(result){
      const{user_id,siteCode}=this.props;
      const isflag = !this.state.defaultAddressStatus ? "0" : this.state.defaultAddressStatus;
      if(this.state.status==="update") {
        const updateParam = {
          "id":this.state.addressListId,
          "isflag":this.state.defaultAddressStatus,
          "country":"中国",
          "province":this.state.province,
          "city":this.state.city,
          "district":this.state.district,
          "address":this.state.detailAddress,
          "zipcode":this.state.postalCode,
          "consignee":this.state.consignee,
          "telephone":this.state.landLinePhone,
          "phone_number":this.state.telPhone
        }
        updateAddress(updateParam).then(data => {
          alert(`修改${data.message}了`)
          if(data.code === 1){
            this.props.history.push('/user/addressList');
          }

        }).catch(error => {
          this.onFailed(error);
        })
      }else{
        addAddress(user_id,siteCode,"中国",this.state.province,this.state.city,this.state.district,this.state.detailAddress,this.state.postalCode,this.state.consignee,this.state.landLinePhone,this.state.telPhone,isflag).then(data=>{
          alert(`新增地址列表${data.message}了`)
          if(data.code===1){
            this.setState({
              consignee:"",
              telPhone:"",
              landLinePhone:"",
              area:[],
              province:"",
              city:"",
              district:"",
              detailAddress:"",
              postalCode:"",
              defaultAddressStatus:false,
              consigneeError:"",
              areaError:"",
              consigneeError:"",
              detailAddressError:"",
              postalCodeError:"",
            })
          }else{
            console.log(error);
          }
        }).catch(error=>{
          this.onFailed(error);
        })
      }
    }
  }

  /**
   *出现失败的情况
   */
  onFailed(error){
    console.log(error);
    throw '出现失败的情况!'
  }

  //地区选择
  getArea(){
    areas.forEach((area) => {
      const matchCity = cities.filter(city => city.code === area.parent_code)[0];
      if (matchCity) {
        matchCity.children = matchCity.children || [];
        matchCity.children.push({
          label: area.name,
          value: area.name,
        });
      }
    });
    cities.forEach((city) => {
      const matchProvince = provinces.filter(province => province.code === city.parent_code)[0];
      if (matchProvince)  {
        matchProvince.children = matchProvince.children || [];
        matchProvince.children.push({
          label: city.name,
          value: city.name,
          children: city.children,
        });
      }
    });
    const options = provinces.map(province => ({
      label: province.name,
      value: province.name,
      children: province.children,
    }));
    // console.log(options);
    return options;
  }

  //获取地区的数值
  onChange(value) {
    let area = value;
    // console.log(area);
    // console.log(area[0],area[1],area[2]);
    // console.log("---this----",this)
    this.setState({
      area:area,
      province:area[0],
      city:area[1],
      district:area[2],
    })
  }



  render(){
    const options =  this.getArea();
    return (
      <PerDetail>
        <Label>新增/编辑收货地址<Back><Alink to="/">返回首页</Alink></Back></Label>
        <Label><Span>*</Span>收货人：<Input placeholder="输入收货人" value={this.state.consignee} onChange={(e)=> this.onInput('consignee',e.target.value)} /></Label>
        <ErrorTips>{this.state.consigneeError}</ErrorTips>
        <Label><Span>*</Span>手机号：<Input type="number" placeholder="输入手机号" value={this.state.telPhone} onChange={(e)=> this.onInput('telPhone',e.target.value)}/></Label>
        <ErrorTips>{this.state.telPhoneError}</ErrorTips>
        <Label>固定电话：<Input type="number" placeholder="输入固定电话" value={this.state.landLinePhone} onChange={(e)=> this.onInput('landLinePhone',e.target.value)}/></Label>
        <ErrorTips></ErrorTips>
        <Label><Span>*</Span>所在地区：<AreaSpan><Cascader defaultValue={[this.state.province, this.state.city, this.state.district]} options={options} onChange={(event)=>this.onChange(event)} placeholder="选取所在的省市区"/>
        </AreaSpan></Label>
        <ErrorTips>{this.state.areaError}</ErrorTips>
        <Label><Span>*</Span>详细地址：<Input placeholder="详细地址" value={this.state.detailAddress} onChange={(e)=> this.onInput('detailAddress',e.target.value)}/></Label>
        <ErrorTips>{this.state.detailAddressError}</ErrorTips>
        <Label>邮政编码：<Input type="number" placeholder="输入邮政编码" value={this.state.postalCode} onChange={(e)=> this.onInput('postalCode',e.target.value)}/></Label>
        <ErrorTips>{this.state.postalCodeError}</ErrorTips>
        <Label><input type="checkbox" checked={this.state.defaultAddressStatus===true} onChange={(e)=>this.setState({defaultAddressStatus:e.target.checked})}/>设为默认地址</Label>
        <AlinkBtn onClick={(event)=>this.handleClick()}>保存</AlinkBtn>
      </PerDetail>
    );
  }
}

OperateAddress.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  user_id:makeSelectUserId(),
  siteCode: makeSelectSiteCode(),
});
const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(OperateAddress);

