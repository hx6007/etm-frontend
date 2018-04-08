/*
* 申请加盟入驻
* */

import React from 'react';
import styled from 'styled-components';
import {VerticalLayout, HorizontalLayout} from '../../components/Layout/index';
import icFriend from 'images/register/friend-icon.png';
import {register} from '../../utils/service.js';
import img_protocol from './image/protocol.jpg';
import img_close from './image/Close.png';
import { Upload, message, Button, Icon, Cascader  } from 'antd';
import {RESOURCE_ROOT,ETM_ROOT,SITE_CODE,setUrl} from '../../utils/serverUrl.js';
import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';


const ApplyFormDiv = styled(VerticalLayout)`
    width: 80%;
    height: auto;
  `;
const HeaderView = styled.div`
    padding-bottom: 12px;
    border-bottom: 1px dashed #afafaf;
    overflow: hidden;
  `;
const FriendImg = styled.img`
    display: inline-flex;
    width: 38px;
    height: 30px;
    margin:0 0;
  `;
const HeaderTitle = styled.span`
    vertical-align: middle;
    font-size: 20px;
    margin-left: 10px;
    color: #4d575d;
  `;
const MainView = styled(VerticalLayout)`
    height: auto;
    padding: 20px 0px 0px 30px;
  `;
const CustomerTypeView = styled(VerticalLayout)`
    margin-bottom: 18px;
`;
const CustomerType = styled(HorizontalLayout)`
    margin-bottom: 3px;
  `;
const TypeLable = styled.div`
    font-size: 17px;
    font-weight: normal;
    color: #666;
  `;
const StarSpan = styled.span`
    font-size: 20px;
    margin-right: 6px;
    color: #ff1e00;
  `;
const OptionView = styled(HorizontalLayout)`
    padding-left: 30px;
  `;
const RadioBox = styled.label`
    margin-right: 20px;
    cursor: pointer;
  `;
const RadioInput = styled.input`
    margin-right: 8px;
    cursor: pointer;
    z-index: 10;
  `;
const RadioTitle = styled.span`
    color: #4d575d;
    font-size: 16px;
  `;
const ErrorTips = styled.div`
    height: 20px;
    padding-left: 150px;
    color: #e72b06;
    font-size: 16px;
    font-weight: normal;
  `;
const TextView = styled(OptionView)`
    width: 70%;
    .ant-cascader-picker{
      display:block;
      width:100%;
      margin-left:0;
    }
  `;
const FileView = styled(TextView)``;
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
    background:#ffffff;
    box-shadow: inset 0 1px rgba(0,0,0,0.075);
    -webkit-box-shadow: inset 0 1px rgba(0,0,0,0.075);
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    
  `;
const FileInput = styled.input`
    width: 50%;
    outline: none;
    border: none;
    cursor: pointer;
  `;
const Tips = styled(ErrorTips)`   
    width: 50%;
    margin-left: 128px;
    margin-top:1px;
    padding: 2px 4px;
    font-size: 14px;
    color: #e72b06;
    background-color: #f9f2f4;
  `;
const ProtocolView = styled(OptionView)`
    padding-left: 140px;
  `;
const ProtocolSpan = styled.label`
    color: #1634ff;
    margin-left: 8px;
    cursor: pointer;
  `;
const SubmitInput = styled.input`
    display: inline-flex;
    width: 16%;
    height: 30px;
    line-height: 30px;
    margin-left: 140px;
    margin-top: 8px;
    justify-content: center;
    font-size: 14px;
    color: #ffffff;
    background-color: #ff5722;
    cursor: pointer;
    &:hover,&:focus,&:active{
      background-color: #e7240a;
    }
  `;
const AreaBox = styled(VerticalLayout)``;
const AreaSelectView = styled(OptionView)`
    width:100%;
    color: #666;
    font-size:17px;
    margin-top:10px;
  `;
const AreaTextInput = styled(TextInput)`
    width: 60%;
  `;
const AreaErrorTips = styled(ErrorTips)`
    padding-left: 55px;
`;
const SelectView = styled(OptionView)`
    width:70%;
  `;
const SelectBox = styled.select`
    height: 34px;
    line-height: 34px;
    padding: 6px 12px;
    margin-right: 10px;
    font-size: 14px;
    color: #555;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    -webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    outline: none;
  `;
const OptionBox = styled.option`
    font-weight: normal;
    display: block;
    padding: 0px 2px 1px;
    white-space: pre;
    height: 1.2em;
  `;
const SelectBox2 = styled(SelectBox)`
    width:70%;
    margin-left:129px;
  `;
const ProtocolModal = styled(HorizontalLayout)`
    display: flex;
    width:100%;
    height:auto;
    margin-top: 20px;
    background: rgba(0,0,0,0.5);
    z-index: 50;
  `;
const Protocol = styled.img`
    width:80%;
    justify-content: center;
    align-items: center;
  `;
const CloseBtn = styled.img`
    display: inline-flex;
    justify-content: center;
    width:128px;
    height:128px;
    margin-left: 15px;
    cursor: pointer;
  `;

class ApplyForm extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      platform_nameType:['门店客户','装修公司','施工队','设计师'],
      arrayCustomerType:['store','decoration','construction','designer'], //0:门店客户store ;  1:装修公司decoration ;  2:施工队construction ;  3:设计师designer;
      indexCustomerType:((SITE_CODE === "51exc")?1:0),
      customerName:"", //客户名称
      companyName:"", //公司名称
      contactPerson:"", //联系人
      arraySex:['男','女'],
      indexSex:0,
      telPhone:"", //手机号
      weChatNumber:"", //微信号
      province:"", //省份
      city:"", //城市
      district:"", //县区
      area:[],
      detailAddress:"", //详细地址
      introducerPhone:"", //推荐人手机号
      uploadedFiles:[], //点击打开的相关图片文件的数组
      uploadedImages:[], //整理过的相关图片数组 (传入接口要用的数据)
      customerNameError:"",
      companyNameError:"",
      contactPersonError:"",
      telPhoneError:"",
      weChatNumberError:"",
      areaError:"",
      detailAddressError:"",
      introducerPhoneError:"",
      relatedImagesError:"* 请按规定提示 上传相关数量的照片！", //上传相关图片有误提示 (由于屏蔽了上传图片，清空了提示)
      uploadImageResult:false, //上传图片的结果初始为false  (由于先屏蔽了上传图片功能，这里的结果设为true!)
      agree:"", //是否同意合作
      protocolError:"* 请点击查阅《合作协议》，合则点击同意!",
      visible:false,
      submitStatus:false,  //表单提交的状态
      showUploadList:true  //清空上传图片的列表
    }
  }

  /**
   * 监听表单中的数据，保存到state中
   */
  onInput(key,value){
    this.setState({
      [key]:value
    })
  }

  //设置注册的客户类型选择项
  getTypeLable(){
    let jk_set = (SITE_CODE === "97ejk")
    let jktm_set = (SITE_CODE === "51etm" || SITE_CODE === "97ejk")
    let jkxc_set = (SITE_CODE === "51etm" || SITE_CODE === "97ejk" || SITE_CODE === "51exc")
    return(
        <CustomerTypeView>
          <CustomerType>
            <TypeLable><StarSpan>*</StarSpan>客户类型：</TypeLable>
            <OptionView>
              {jktm_set && <RadioBox>
                <RadioInput type="radio" name="radio1" checked={this.state.indexCustomerType===0} onClick={e => this.setState({indexCustomerType:0})} onChange={e=>{}}></RadioInput>
                <RadioTitle>门店客户</RadioTitle>
              </RadioBox>}
              {jkxc_set && <RadioBox>
                <RadioInput type="radio" name="radio1" checked={this.state.indexCustomerType===1} onClick={e => this.setState({indexCustomerType:1})} onChange={e=>{}}></RadioInput>
                <RadioTitle>装修公司</RadioTitle>
              </RadioBox>}
              {/*<RadioBox>*/}
                {/*<RadioInput type="radio" name="radio1" onClick={e => this.setState({indexCustomerType:2})}></RadioInput>*/}
                {/*<RadioTitle>施工队</RadioTitle>*/}
              {/*</RadioBox>*/}
              {jk_set && <RadioBox>
                <RadioInput type="radio" name="radio1" onClick={e => this.setState({indexCustomerType:3})}></RadioInput>
                <RadioTitle>设计师</RadioTitle>
              </RadioBox>}
            </OptionView>
          </CustomerType>
          <ErrorTips></ErrorTips>
        </CustomerTypeView>)
  }
  //获取施工队部分表单的视图
  getConstructionView(){
    return(
      <div>
        <CustomerTypeView>
          <CustomerType>
            <TypeLable><StarSpan>*</StarSpan>工龄：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TypeLable>
            <TextView>
              <TextInput type="text" placeholder="输入内容" onChange={(e)=> this.onInput('seniority',e.target.value)}></TextInput>
            </TextView>
          </CustomerType>
          <ErrorTips></ErrorTips>
        </CustomerTypeView>
        <CustomerTypeView>
          <CustomerType>
            <TypeLable><StarSpan>*</StarSpan>施工队名称：</TypeLable>
            <TextView>
              <TextInput type="text" placeholder="输入内容" onChange={(e)=> this.onInput('constructionName',e.target.value)}></TextInput>
            </TextView>
          </CustomerType>
          <ErrorTips></ErrorTips>
        </CustomerTypeView>
        <CustomerTypeView>
          <CustomerType>
            <TypeLable><StarSpan>*</StarSpan>服务地区：</TypeLable>
            <SelectView>
              <SelectBox>
                <OptionBox value="--省份--">--省份--</OptionBox>
                <OptionBox value="北京市">北京市</OptionBox>
                <OptionBox value="天津市">天津市</OptionBox>
                <OptionBox value="河北省">河北省</OptionBox>
                <OptionBox value="山西省">山西省</OptionBox>
                <OptionBox value="内蒙古自治区">内蒙古自治区</OptionBox>
                <OptionBox value="辽宁省">辽宁省</OptionBox>
                <OptionBox value="吉林省">吉林省</OptionBox>
                <OptionBox value="黑龙江省">黑龙江省</OptionBox>
                <OptionBox value="上海市">上海市</OptionBox>
                <OptionBox value="江苏省">江苏省</OptionBox>
                <OptionBox value="浙江省">浙江省</OptionBox>
                <OptionBox value="安徽省">安徽省</OptionBox>
                <OptionBox value="福建省">福建省</OptionBox>
                <OptionBox value="江西省">江西省</OptionBox>
                <OptionBox value="山东省">山东省</OptionBox>
                <OptionBox value="河南省">河南省</OptionBox>
                <OptionBox value="湖北省">湖北省</OptionBox>
                <OptionBox value="湖南省">湖南省</OptionBox>
                <OptionBox value="广东省">广东省</OptionBox>
                <OptionBox value="广西壮族自治区">广西壮族自治区</OptionBox>
                <OptionBox value="海南省">海南省</OptionBox>
                <OptionBox value="重庆市">重庆市</OptionBox>
                <OptionBox value="四川省">四川省</OptionBox>
                <OptionBox value="贵州省">贵州省</OptionBox>
                <OptionBox value="云南省">云南省</OptionBox>
                <OptionBox value="西藏自治区">西藏自治区</OptionBox>
                <OptionBox value="陕西省">陕西省</OptionBox>
                <OptionBox value="甘肃省">甘肃省</OptionBox>
                <OptionBox value="青海省">青海省</OptionBox>
                <OptionBox value="宁夏回族自治区">宁夏回族自治区</OptionBox>
                <OptionBox value="新疆维吾尔自治区">新疆维吾尔自治区</OptionBox>
              </SelectBox>
              <SelectBox>
                <OptionBox value="--城市--">--城市--</OptionBox>
                <OptionBox value="北京市">北京市</OptionBox>
                <OptionBox value="天津市">天津市</OptionBox>
                <OptionBox value="河北省">河北省</OptionBox>
              </SelectBox>
              <SelectBox>
                <OptionBox value="--地区--">--地区--</OptionBox>
                <OptionBox value="北京市">北京市</OptionBox>
                <OptionBox value="天津市">天津市</OptionBox>
                <OptionBox value="河北省">河北省</OptionBox>
              </SelectBox>
            </SelectView>
          </CustomerType>
          <SelectBox2>
            <OptionBox value="--街道--">--街道--</OptionBox>
            <OptionBox value="北京道">北京道</OptionBox>
            <OptionBox value="天津道">天津道</OptionBox>
            <OptionBox value="河北道">河北道</OptionBox>
          </SelectBox2>
          <ErrorTips></ErrorTips>
        </CustomerTypeView>
        <CustomerTypeView>
          <CustomerType>
            <TypeLable><StarSpan>*</StarSpan>从业年限：</TypeLable>
            <OptionView>
              <RadioBox>
                <RadioInput type="radio" name="radio1"></RadioInput>
                <RadioTitle>5年以下</RadioTitle>
              </RadioBox>
              <RadioBox>
                <RadioInput type="radio" name="radio1"></RadioInput>
                <RadioTitle>5年以上</RadioTitle>
              </RadioBox>
            </OptionView>
          </CustomerType>
          <ErrorTips></ErrorTips>
        </CustomerTypeView>
        <CustomerTypeView>
          <CustomerType>
            <TypeLable><StarSpan>*</StarSpan>施工案例数：</TypeLable>
            <OptionView>
              <RadioBox>
                <RadioInput type="radio" name="radio1"></RadioInput>
                <RadioTitle>10个以下</RadioTitle>
              </RadioBox>
              <RadioBox>
                <RadioInput type="radio" name="radio1"></RadioInput>
                <RadioTitle>10~100</RadioTitle>
              </RadioBox>
              <RadioBox>
                <RadioInput type="radio" name="radio1"></RadioInput>
                <RadioTitle>100~1000</RadioTitle>
              </RadioBox>
              <RadioBox>
                <RadioInput type="radio" name="radio1"></RadioInput>
                <RadioTitle>1000以上</RadioTitle>
              </RadioBox>
            </OptionView>
          </CustomerType>
          <ErrorTips></ErrorTips>
        </CustomerTypeView>
      </div>
    )
  }

  //获取设计师部分表单的视图
  getDesignerView(){
    return (
    <div>
      <CustomerTypeView>
        <CustomerType>
          <TypeLable><StarSpan>*</StarSpan>设计师级别：</TypeLable>
          <OptionView>
            <RadioBox>
              <RadioInput type="radio" name="radio1"></RadioInput>
              <RadioTitle>优秀设计师</RadioTitle>
            </RadioBox>
            <RadioBox>
              <RadioInput type="radio" name="radio1"></RadioInput>
              <RadioTitle>资深设计师</RadioTitle>
            </RadioBox>
            <RadioBox>
              <RadioInput type="radio" name="radio1"></RadioInput>
              <RadioTitle>首席设计师</RadioTitle>
            </RadioBox>
          </OptionView>
        </CustomerType>
        <ErrorTips></ErrorTips>
      </CustomerTypeView>
      <CustomerTypeView>
        <CustomerType>
          <TypeLable><StarSpan>*</StarSpan>设计案例数：</TypeLable>
          <OptionView>
            <RadioBox>
              <RadioInput type="radio" name="radio1"></RadioInput>
              <RadioTitle>10个以下</RadioTitle>
            </RadioBox>
            <RadioBox>
              <RadioInput type="radio" name="radio1"></RadioInput>
              <RadioTitle>10~100</RadioTitle>
            </RadioBox>
            <RadioBox>
              <RadioInput type="radio" name="radio1"></RadioInput>
              <RadioTitle>100~1000</RadioTitle>
            </RadioBox>
            <RadioBox>
              <RadioInput type="radio" name="radio1"></RadioInput>
              <RadioTitle>1000以上</RadioTitle>
            </RadioBox>
          </OptionView>
        </CustomerType>
        <ErrorTips></ErrorTips>
      </CustomerTypeView>
    </div>
  )}

  //上传相关图片的匹配提示
  tipsMatch(){
    if(this.state.indexCustomerType === 3){
      return (<Tips>提示：个人照片1张(必填)&nbsp;工作室照片(选填)</Tips>)
    }else if(this.state.indexCustomerType === 2){
      return (<Tips>提示：施工队照片1张(必填)</Tips>)
    }else if(this.state.indexCustomerType === 1){
      return (<Tips>提示：公司照片3张(必填)&nbsp;公司执照1张(选填)&nbsp;</Tips>)
    }else{
      return (<Tips>提示：门店照片3张(必填)&nbsp;营业执照1张(选填)</Tips>)
    }
  }

  //点击申请提交按钮，触发后台接口提供的验证，对数据的处理等方法
  handleClick(event){
    let errorResult = false; //错误提示返回的true 与 false

     let customernameError = this.checkTextError(this.state.customerName); //验证输入框是否为空，有就返回提示
     errorResult = this.renderingError(customernameError,"customerNameError"); //渲染错误提示
     let companynameError = this.checkTextError(this.state.companyName);
     errorResult = this.renderingError(companynameError,"companyNameError");
     let contactpersonError = this.checkTextError(this.state.contactPerson);
     errorResult = this.renderingError(contactpersonError,"contactPersonError");
    let telphoneError = this.checkTelPhoneError();
    errorResult = this.renderingError(telphoneError,"telPhoneError");
    let wechatnumberError = this.checkWeChatError();
    errorResult = this.renderingError(wechatnumberError,"weChatNumberError");
    let areaerror = this.checkCascaderError(this.state.area);
    errorResult = this.renderingError(areaerror,"areaError");
     let detailaddressError = this.checkTextError(this.state.detailAddress);
     errorResult = this.renderingError(detailaddressError,"detailAddressError");
     let errorProtocolResult = this.renderingProtocolError();
     //errorResult = this.state.uploadImageResult;

    if(!this.state.customerName){
      errorResult = false;
    }else if(!this.state.companyName){
      errorResult = false;
    }else if(!this.state.contactPerson){
      errorResult = false;
    }else if(telphoneError){
      errorResult = false;
    }else if(wechatnumberError){
      errorResult = false;
    }else if(!this.state.province){
      errorResult = false;
    }else if(!this.state.detailAddress){
      errorResult = false;
    }else if(!this.state.uploadImageResult){
      errorResult = false;
    }else{
      errorResult = true;
    }

    if(errorResult===true&&errorProtocolResult===true){  //(结果都true) 所有输入的信息都没有出错的时候，去調注册接口
      this.submitToServer();
    }else{
      alert("信息填写有错误，请核实后再次提交！")
    }
  }

  /**
   * 检查文本框信息的错误 返回错误信息
   * text:state里面定义的参数
   */
  checkTextError(text){
    let empty=(!text)||(!text.trim());
    if(empty){
      return '* 必填区域不能为空!'
    }
  }

  //验证客户手机号码
  checkTelPhoneError(){
    let reg_telphone = /^1[34578]\d{9}$/;
    if(!reg_telphone.test(this.state.telPhone)){
      return '* 请输入正确的手机号!'
    }
  }

  //验证客户微信号码 (微信号规则：微信账号仅支持1-20个字母、数字、下划线)
  checkWeChatError(){
    let reg_wechat = /^[a-zA-Z\d_]{1,}$/;
    if(!reg_wechat.test(this.state.weChatNumber)){
      return '* 请输入正确的微信号!'
    }
  }

  //验证省市区控件是否为空
  checkCascaderError(a){
    if(a.length <= 0){
      return '* 必填区域不能为空!'
    }
  }

  /**
   * 渲染错误信息到页面
   * variate:定义的变量名 (收错误提示的)
   * stateParam：state里面定义的参数
   */
  renderingError(variate,stateParam){
    if(variate){
      this.setState({
        [stateParam]:variate
      })
      return false;
    }else{
      this.setState({
        [stateParam]:''
      })
      return true;
    }
  }

  //验证是否同意合作协议
  renderingProtocolError(){
    if(this.state.agree == true){
      this.setState({
        protocolError:""
      })
      return true;
    }else{
      this.setState({
        protocolError:"* 请点击查阅《合作协议》，合则点击同意!"
      })
      return false;
    }
  }

  /**
   * 接通注册接口，进行表单的提交
   */
  submitToServer(){
    let site_code = (SITE_CODE == "51etm") ? this.state.arrayCustomerType[this.state.indexCustomerType] : SITE_CODE ;
    let param={
          name:this.state.customerName,
          company:this.state.companyName,
          contact:this.state.contactPerson,
          sex:this.state.arraySex[this.state.indexSex],
          mobile:this.state.telPhone,
          wechat:this.state.weChatNumber,
          province:this.state.province,
          city:this.state.city,
          district:this.state.district,
          street:"",
          address:this.state.detailAddress,
          referrer:this.state.introducerPhone,
          site_code:site_code,
          platform_name:this.state.platform_nameType[this.state.indexCustomerType]
    };
    console.log("收集到的客户信息...",param);
    register(param).then(data=>{
      // console.log("data里面的资料--------->",data);
      if(data.code===1){
        alert(`您的提交成功了！`)
        location.assign('/apply')
      }else if(data.message==="username已存在"){
        alert(`* 这个客户名称已经注册过了,要更换客户名称！`)
        this.setState({
          customerNameError:"* 客户名称已经注册过了,要更换客户名称！"
        })
      }else if(data.message==="该手机号已注册"){
        alert(`* 这个手机号已经注册过了,要更换手机号码！`)
        this.setState({
          telPhoneError:"* 手机号已经注册过了,要更换手机号码！"
        })
      }else{
        alert(data.message);
        console.log(data)
      }
    }).catch(error=>{
      this.onFailed(error);
    })
  }

  /**
   *提交注册表单失败的情况
   */
  onFailed(error){
    console.log(error);
    throw '出现失败的情况!'
  }

  /**
   *弹出合作协议的模态框
   */
  closeProtocol(){
    return   <ProtocolModal>
      <Protocol src={img_protocol}></Protocol>
      <CloseBtn src={img_close} onClick={(e)=>this.setState({visible:false})}></CloseBtn>
    </ProtocolModal>
  }

  //点击上传图片时候，触发的事件(运用antd-Upload组件的版本)
  handleChange = (info) => {
    // console.log("info.file.status--->",info.file.status);
    if(info.file.status !== 'uploading'){
      // console.log("----不是uploading的状态---")
      // console.log(info.file.status, info.fileList);
      // console.log("-----info图片的数量：-------",info.fileList.length);
      if(info.fileList.length < 3){
        this.setState({
          relatedImagesError:"* 请按规定的提示 上传相关数量的照片！",
          uploadImageResult:false,
        })
      }else{
        this.setState({
          relatedImagesError:"",
          uploadImageResult:true,
        })
      }
    }
    if(info.file.status === 'done'){
      // console.log("----done的状态---")
      // console.log(info);
      if(info.fileList.length < 3){
        this.setState({
          relatedImagesError:"* 请按规定的提示 上传相关数量的照片！",
          uploadImageResult:false,
        })
      }else{
        this.setState({
          relatedImagesError:"",
          uploadImageResult:true,
        })
      }
      message.success(`${info.file.name} 上传成功！`);
    }else if(info.file.status === 'error'){
      // console.log("----error的状态---")
      message.error(`${info.file.name} 上传失败！`);
    }
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
    const url = setUrl("etm_api","/lola_cms_Interface/file/upload.do");
    const props = {
      name:'file',
      action:url,
      onChange:this.handleChange,
    };
    return (
      <ApplyFormDiv>
        <HeaderView>
          <FriendImg src={icFriend} alt="申请人员"></FriendImg>
          <HeaderTitle>立即申请加盟入驻</HeaderTitle>
        </HeaderView>
        <MainView>
          {this.getTypeLable()}
          <CustomerTypeView>
            <CustomerType>
              <TypeLable><StarSpan>*</StarSpan>客户名称：</TypeLable>
              <TextView>
                <TextInput type="text" placeholder="输入内容" value={this.state.customerName} onChange={(e)=> this.onInput('customerName',e.target.value)}></TextInput>
              </TextView>
            </CustomerType>
            <ErrorTips>{this.state.customerNameError}</ErrorTips>
          </CustomerTypeView>
          <CustomerTypeView>
            <CustomerType>
              <TypeLable><StarSpan>*</StarSpan>公司名称：</TypeLable>
              <TextView>
                <TextInput type="text" placeholder="输入内容" value={this.state.companyName} onChange={(e)=> this.onInput('companyName',e.target.value)}></TextInput>
              </TextView>
            </CustomerType>
            <ErrorTips>{this.state.companyNameError}</ErrorTips>
          </CustomerTypeView>
          <CustomerTypeView>
            <CustomerType>
              <TypeLable><StarSpan>*</StarSpan>联系人：&nbsp;&nbsp;&nbsp;</TypeLable>
              <TextView>
                <TextInput type="text" placeholder="输入内容" value={this.state.contactPerson} onChange={(e)=> this.onInput('contactPerson',e.target.value)}></TextInput>
              </TextView>
            </CustomerType>
            <ErrorTips>{this.state.contactPersonError}</ErrorTips>
          </CustomerTypeView>
          <CustomerTypeView>
            <CustomerType>
              <TypeLable><StarSpan></StarSpan>性别：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TypeLable>
              <OptionView>
                <RadioBox>
                  <RadioInput type="radio" name="radio2" checked={this.state.indexSex===0} onClick={e => this.setState({indexSex:0})} onChange={e=>{}}></RadioInput>
                  <RadioTitle>男</RadioTitle>
                </RadioBox>
                <RadioBox>
                  <RadioInput type="radio" name="radio2" checked={this.state.indexSex===1} onClick={e => this.setState({indexSex:1})} onChange={e=>{}}></RadioInput>
                  <RadioTitle>女</RadioTitle>
                </RadioBox>
              </OptionView>
            </CustomerType>
            <ErrorTips></ErrorTips>
          </CustomerTypeView>
          <CustomerTypeView>
            <CustomerType>
              <TypeLable><StarSpan>*</StarSpan>手机号：&nbsp;&nbsp;&nbsp;</TypeLable>
              <TextView>
                <TextInput type="number" placeholder="输入内容" value={this.state.telPhone} onChange={(e)=> this.onInput('telPhone',e.target.value)}></TextInput>
              </TextView>
            </CustomerType>
            <ErrorTips>{this.state.telPhoneError}</ErrorTips>
          </CustomerTypeView>
          <CustomerTypeView>
            <CustomerType>
              <TypeLable><StarSpan>*</StarSpan>微信号：&nbsp;&nbsp;&nbsp;</TypeLable>
              <TextView>
                <TextInput type="text" placeholder="输入内容" value={this.state.weChatNumber} onChange={(e)=> this.onInput('weChatNumber',e.target.value)}></TextInput>
              </TextView>
            </CustomerType>
            <ErrorTips>{this.state.weChatNumberError}</ErrorTips>
          </CustomerTypeView>
          <CustomerTypeView>
            <CustomerType>
              <TypeLable><StarSpan>*</StarSpan>所在地区：</TypeLable>
              <TextView>
                <Cascader defaultValue={[]} options={options} onChange={(event)=>this.onChange(event)} placeholder="请选择城市"/>
              </TextView>
            </CustomerType>
            <ErrorTips>{this.state.areaError}</ErrorTips>
          </CustomerTypeView>
          <CustomerTypeView>
            <CustomerType>
              <TypeLable><StarSpan>*</StarSpan>详细地址：</TypeLable>
              <TextView>
                <TextInput type="text" placeholder="输入内容" value={this.state.detailAddress} onChange={(e)=> this.onInput('detailAddress',e.target.value)}></TextInput>
              </TextView>
            </CustomerType>
            <ErrorTips>{this.state.detailAddressError}</ErrorTips>
          </CustomerTypeView>

          {/*施工队需要填写工龄、施工队名称、服务地区、从业年限、施工案例数*/}
          {this.state.customerType === 2 ? this.getConstructionView() : ""}
          {/*设计师需要填写级别、设计案例数*/}
          {this.state.customerType === 3 ? this.getDesignerView() : ""}

          <CustomerTypeView>
            <CustomerType>
              <TypeLable><StarSpan></StarSpan>推荐人手机号：</TypeLable>
              <TextView>
                <TextInput type="number" placeholder="输入手机号" value={this.state.introducerPhone} onChange={(e)=> this.onInput('introducerPhone',e.target.value)}></TextInput>
              </TextView>
            </CustomerType>
            <ErrorTips></ErrorTips>
          </CustomerTypeView>
          <CustomerTypeView>
            <CustomerType>
              <TypeLable><StarSpan>*</StarSpan>相关照片：</TypeLable>
              <FileView>
                {/*<label>*/}
                  {/*<FileInput type="file" multiple="multiple" accept="image/png, image/jpeg, image/jpg" onChange={(e)=>this.onImageDrop(e)}></FileInput>*/}
                {/*</label>*/}
                {/*showUploadList={this.state.showUploadList}*/}
                <Upload {...props}  multiple={true} accept="image/*">
                  <Button>
                    <Icon type="upload"/>上传图片
                  </Button>
                </Upload>
                {/*<UploadImages/>*/}
              </FileView>
            </CustomerType>
            {/*/!*匹配提示方法*!/*/}
            {this.tipsMatch()}
            <ErrorTips>{this.state.relatedImagesError}</ErrorTips>
          </CustomerTypeView>
          <CustomerTypeView>
            <CustomerType>
              <ProtocolView>
                <RadioBox>
                  <RadioInput type="checkbox" checked={this.state.agree===true} onChange={(e)=>this.setState({agree:e.target.checked})} name="radio1"></RadioInput>
                  <RadioTitle>&nbsp;已同意&nbsp;<ProtocolSpan onClick={(e)=>this.setState({visible:true})}>《合作协议》</ProtocolSpan></RadioTitle>
                </RadioBox>
              </ProtocolView>
            </CustomerType>
            <ErrorTips>{this.state.protocolError}</ErrorTips>
            <SubmitInput type="submit" value="提交申请" onClick={(event)=>this.handleClick()}></SubmitInput>
            {/*<ErrorTips>{this.state.submitStatus}</ErrorTips>*/}
          </CustomerTypeView>
        </MainView>
        {this.state.visible === true ? this.closeProtocol() : ""}
      </ApplyFormDiv>
    );
  }
}

export default ApplyForm;







