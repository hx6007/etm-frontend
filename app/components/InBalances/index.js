/**
*
* InBalances
*
*/

import React from 'react';
import styled from 'styled-components';
import {setUrl} from '../../utils/serverUrl.js';
import { Icon, Divider, DatePicker, Select,Input,Button,Pagination,Upload,message } from 'antd';
import {addBillOrder, getBankList} from "../../utils/service";
const Option = Select.Option;



const CusName = styled.span`
  font-weight: bold;
  font-size: 17px;
`;

const Div = styled.div`
  padding: 5px 30px;
`;

const CustomerName = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 43px;
`;

const MoneyStatus = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: solid 1px #F2F2F2 ;
  padding: 20px 0;
  font-size: 13px;
  .ant-input{
    height: 25px;
    border-radius: 0;
    width: 150px;

  }
  .ant-select-selection--single{
    height: 27px;
    width: 150px;
  }
  .ant-select-selection__rendered{
    line-height: 27px;

  }
  .ant-select-selection{
    border-radius: 0;
  }
`;

const ManPer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  .ant-input{
    height: 25px;
    border-radius: 0;
  }
  .ant-select-selection--single{
    height: 27px;
    width: 150px;
  }
  .ant-select-selection__rendered{
    line-height: 27px;
  }
  .ant-select-selection{
    border-radius: 0;
  }
`;

const ManPri = styled(ManPer)`
  padding-top: 10px;
`;



const InputOne = styled.input`
  border: solid 1px #DEDFE0;
  height: 27px;
  width: 150px;
  background: #ffffff;
`;

const InputYu = styled(InputOne)`
  width: 121px;
`;
const SpanYu = styled.span`
  border: solid 1px #DEDFE0;
  background: #F8F8F8;
  width: 30px;
  text-align: center;
`;
const SpansAnd = styled.span`
  display: flex;
  flex-wrap: wrap;
  padding-left: 42px;
`;
const InputUp = styled(InputOne)`
  cursor: not-allowed;
  border: solid 1px #DEDFE0;
  height: 27px;
  width: 413px;
  background: #ECECEC;
`;
const InputTime = styled.span`
  //padding-left: 9px;
`;
const BankPri = styled.span`
  padding-left: 45px;
`;
const UpLoads = styled.div`
  padding: 10px 0 0 34px;
  .ant-btn{
    height: 27px;
    border-radius: 0;
    width: 150px;
  }
`;
const PushUnsimplified = styled.span`
  //padding-right: 26px;
`;
const GetUni = styled.div`
  .ant-select-selection--single{
    height: 27px;
    width: 300px;
    border-radius: 0;
  }
  .ant-select-selection__rendered{
  margin-left: 0px;
  }
`;
const ThreeDiv = styled.div`
  padding-top: 50px;
`;
const InBank = styled(InputUp)`
  cursor: not-allowed;
  background: #fff;
  width: 300px;
`;
const InBankNo = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 10px 0; 
`;
const InBankSpans = styled.span`
  padding-left: 48px;
`;
const TextDiv = styled.div`
`;
const TextSpan = styled.span`
  display: flex;
  flex-wrap: wrap;
  padding-left: 75px;
`;
const TextIn = styled.textarea`
  //width: 100%;
  width: 94%;
  height: 50px;
  border: solid #E6E7E8 1px;
  background: #fff;
`;
const SummitBut = styled.button`
  height: 30px;
  width: 100px;
  border-radius: 0;
  background: #009B3A;
  color: #fff;
  cursor: pointer;
`;

const ResetBut = styled(SummitBut)`
  background: #fff;
  color: #8F9194;
  border: solid 1px #ECECEC;
  margin-left: 30px;
`;
const SummitDiv = styled.div`
  padding-left: 116px;
  padding-top: 40px;
`;

const SearchButton = styled.button`
  background-color: #F8F8F8 ;
  color: #000;
  font-size: 13px;
  height: 29px;
  width: 60px;
  margin-left: 20px;
  border: solid 1px #E7E8E9;
  cursor: pointer;
`;
const SpanStart = styled.span`
  color: #FB2437;
`;
const ErrorTips = styled.div`
    //height: 20px;
    color: #e72b06;
    font-size: 16px;
    font-weight: normal;
  `;

const provinceData = [
  "佛山市贸泰进出口贸易有限公司",
  "佛山市楼兰家居用品有限公司（银行汇款）",
  "恩平市华昌陶瓷有限公司（四楼刷卡）",
  "佛山市楼兰家居用品有限公司（线下二维码）",
  "楼兰家居网",
  "佛山市南海区百达五金经营部",
  "佛山市楼兰家居用品有限公司（普通汇款）",
  "佛山市楼兰家居用品有限公司（线下招商二维码）"];
const cityData = {
  '佛山市贸泰进出口贸易有限公司': ['中国建设银行佛山榴苑支行', '44001668958053001417'],
  '佛山市楼兰家居用品有限公司（银行汇款）': ['佛山市中国建设银行榴苑支行', '44001668958053002050'],
  '恩平市华昌陶瓷有限公司（四楼刷卡）': ['佛山市中国工商银行石湾支行', '2013018119200088497'],
  '佛山市楼兰家居用品有限公司（线下二维码）': ['线下二维码(0174)', '44050166895800000174'],
  '楼兰家居网': ['支付宝8029', '8029@lolahome.cn'],
  '佛山市南海区百达五金经营部': ['中国建设银行佛山榴苑支行', '44050166895800000173'],
  '佛山市楼兰家居用品有限公司（普通汇款）': ['普通汇款(7727)', '600017727'],
  '佛山市楼兰家居用品有限公司（线下招商二维码）': ['线上招商专用下二维码(7727)', '600017727'],
};

export class InBalances extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      //日期
      startTimes: "",
      startTimeError: "",
      //汇款类型
      remittanceType: "",
      remittanceTypeError: "",
      //贷款项目
      paymentProject:"",
      paymentProjectError: "",
      //汇款单位（人）
      inUnit: "",
      inUnitError: "",
      //汇出银行
      outBank: "",
      outBankError: "",
      //汇出账号
      outNo: "",
      outNoError: "",
      //汇款金额
      inMoney: "",
      inMoneyError: "",
      //汇款金额（大写）
      inMoneyBig: "",
      inMoneyBigError: "",
      //收款单位（人）
      getUnit: "",
      getUnitError: "",
      //汇入银行
      InBank: cityData[provinceData[0]][0],
      InBankError: "",
      //银行账号
      bankNo: cityData[provinceData[0]][1],
      bankNoError: "",
      //备注
      remark: "",
      remarkError: "",
      //图片上传的url
      imageUrl: "",
      imageUrlError: "",
      //上传图片的名称
      upFileName: "",
      timesss:"",
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      thirdCity: cityData[provinceData[0]][1]
    }
  }


  onChangeStart(value, dateString){
    this.setState({startTimes: dateString})
  }


  onOk() {
  }

  changeOrStatus(values){
    this.setState({remittanceType: values})
  }
  changePayStatus(values){
    this.setState({paymentProject: values})

  }

  /**
   * 监听表单中的数据，保存到state中
   */
  onInput(key,value){
    this.setState({
      [key]:value
    })
  }

  handleOnChange(info) {
    if (info.file.status === 'done') {
      if(info.file.response.code === 1){
      let imageUrl = info.file.response.data;
      let upFileName = info.file.name
      this.setState({imageUrl,upFileName})
      }
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
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

  changeShows(){
    console.log("ssssss");
    this.props.changeInBa(false)
  }



  //阿拉伯数字转换为简写汉字
   Arabia_To_SimplifiedChinese(numberValue) {
     var numberValue=new String(Math.round(numberValue*100)); // 数字金额
     var chineseValue=""; // 转换后的汉字金额
     var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
     var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
     var len=numberValue.length; // numberValue 的字符串长度
     var Ch1; // 数字的汉语读法
     var Ch2; // 数字位的汉字读法
     var nZero=0; // 用来计算连续的零值的个数
     var String3; // 指定位置的数值
     if(len>15){
       alert("超出计算范围");
       return "";
     }
     if (numberValue==0){
       chineseValue = "零元整";
       return chineseValue;
     }

     String2 = String2.substr(String2.length-len, len); // 取出对应位数的STRING2的值
     for(var i=0; i<len; i++){
       String3 = parseInt(numberValue.substr(i, 1),10); // 取出需转换的某一位的值
       if ( i != (len - 3) && i != (len - 7) && i != (len - 11) && i !=(len - 15) ){
         if ( String3 == 0 ){
           Ch1 = "";
           Ch2 = "";
           nZero = nZero + 1;
         }
         else if ( String3 != 0 && nZero != 0 ){
           Ch1 = "零" + String1.substr(String3, 1);
           Ch2 = String2.substr(i, 1);
           nZero = 0;
         }
         else{
           Ch1 = String1.substr(String3, 1);
           Ch2 = String2.substr(i, 1);
           nZero = 0;
         }
       }
       else{ // 该位是万亿，亿，万，元位等关键位
         if( String3 != 0 && nZero != 0 ){
           Ch1 = "零" + String1.substr(String3, 1);
           Ch2 = String2.substr(i, 1);
           nZero = 0;
         }
         else if ( String3 != 0 && nZero == 0 ){
           Ch1 = String1.substr(String3, 1);
           Ch2 = String2.substr(i, 1);
           nZero = 0;
         }
         else if( String3 == 0 && nZero >= 3 ){
           Ch1 = "";
           Ch2 = "";
           nZero = nZero + 1;
         }
         else{
           Ch1 = "";
           Ch2 = String2.substr(i, 1);
           nZero = nZero + 1;
         }
         if( i == (len - 11) || i == (len - 3)){ // 如果该位是亿位或元位，则必须写上
           Ch2 = String2.substr(i, 1);
         }
       }
       chineseValue = chineseValue + Ch1 + Ch2;
     }

     if ( String3 == 0 ){ // 最后一位（分）为0时，加上“整”
       chineseValue = chineseValue + "整";
     }

     return chineseValue;
  }

  addInBalance(){
    let errorResult = false;//错误提示返回的true与false
    let startTimeError = this.checkTextError(this.state.startTimes);
    errorResult = this.renderingError(startTimeError,"startTimeError");
    let remittanceTypeError = this.checkTextError(this.state.remittanceType);
    errorResult = this.renderingError(remittanceTypeError,"remittanceTypeError");
    let paymentProjectError = this.checkTextError(this.state.paymentProject);
    errorResult = this.renderingError(paymentProjectError,"paymentProjectError");
    let inUnitError = this.checkTextError(this.state.inUnit);
    errorResult = this.renderingError(inUnitError,"inUnitError");
    let inMoneyError = this.checkTextError(this.state.inMoney);
    errorResult = this.renderingError(inMoneyError, "inMoneyError");
    let inMoneyBigError = this.checkTextError(this.Arabia_To_SimplifiedChinese(this.state.inMoney));
    errorResult = this.renderingError(inMoneyBigError, "inMoneyBigError");
    let getUnitError = this.checkTextError(this.state.getUnit);
    errorResult = this.renderingError(getUnitError, "getUnitError")
    let InBankError = this.checkTextError(this.state.InBank);
    errorResult = this.renderingError(InBankError, "InBankError");
    let bankNoError = this.checkTextError(this.state.bankNo);
    errorResult = this.renderingError(bankNoError, "bankNoError");
    let imageUrlError = this.checkTextError(this.state.imageUrl);
    errorResult = this.renderingError(imageUrlError, "imageUrlError");
    if(!this.state.startTimes){
      errorResult = false;
    }else if(!this.state.remittanceType){
      errorResult = false;
    }else if(!this.state.paymentProject){
      errorResult = false;
    }else if(!this.state.inUnit){
      errorResult = false;
    }else if(!this.state.inMoney){
      errorResult = false;
    }else if(!this.Arabia_To_SimplifiedChinese(this.state.inMoney)){
      errorResult = false;
    }else if(!this.state.getUnit){
      errorResult = false;
    }else if(!this.state.InBank){
      errorResult = false;
    }else if(!this.state.bankNo){
      errorResult = false;
    }else if(!this.state.imageUrl){
      errorResult = false;
    }else {
      errorResult = true;
    }
    if(errorResult === true){
      this.submitOrder();
    }else{
      alert("信息填写有误，请核实后再次提交");
    }
  }

  submitOrder(){
    console.log("submitOrder",this.props);
    let param = {
      DocDate1: this.state.startTimes,
      cltcode: this.props.customer_no,
      totalmoneytype: this.state.remittanceType,
      InCltdoctype: this.state.paymentProject,
      companyname2: this.state.inUnit,
      cashname2: this.state.outBank,
      bankcode2: this.state.outNo,
      totalmoney: this.state.inMoney,
      DXsummoney: this.Arabia_To_SimplifiedChinese(this.state.inMoney),
      companyname: this.state.getUnit,
      cashName: this.state.InBank,
      bankcode: this.state.bankNo,
      Htext: this.state.remark,
      physicalpath: this.state.imageUrl,
      physicalfile: this.state.upFileName,
    };
    addBillOrder(param).then(data => {
      if(data.code === 1){
        alert(data.message);
        this.props.changeInBa(false)
        console.log("data",data);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  handleProvinceChange = (value) => {
    this.setState({
      getUnit: value,
      cities: cityData[value],
      InBank: cityData[value][0] || [],
      bankNo: cityData[value][1] || [],
    });
  };

  removeImg(){
    this.setState({imageUrl: ""});
  }

  render(){
    const uppMoney = this.Arabia_To_SimplifiedChinese(this.state.inMoney);
    const allPayStatus = ["二维码", "银行转账"];
    const allPayGoods = ["正常货款","9.5折预付款","9折预付款","6折预付款","5.5折预付款","5折预付款"];
    const getAllStatus = allPayStatus.map(status => <Option key={status}>{status}</Option>);
    const getPayGoodsStatus = allPayGoods.map(status => <Option key={status}>{status}</Option>);
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    // const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    // const url = "http://api-resource-stg.fslola.cn:8020/lola_cms_Interface/userbill/fileUpload.do";
    const url = setUrl("rc_cms","/lola_cms_Interface/userbill/fileUpload.do")
    const props = {
      name: 'mFile',
      action: url,
      onChange: (e) => this.handleOnChange(e),
      onRemove: (e) => this.removeImg(e),
    };
    return (
      <Div>
        <CustomerName><span>客户名称：<CusName>{this.props.username}</CusName></span><SearchButton onClick={() =>{this.changeShows()}}>返回</SearchButton></CustomerName>
        <MoneyStatus>
          <span>
            汇款日期<SpanStart>*</SpanStart>：<DatePicker placeholder="年/月/日"
                                onChange={(value, dateString) => this.onChangeStart(value, dateString)}
                                onOk={this.onOk()} />
                                <ErrorTips>{this.state.startTimeError}</ErrorTips>
          </span>
          <span>
            汇款类型<SpanStart>*</SpanStart>：
            <Select onChange={(values) => this.changeOrStatus(values)} placeholder="请选择" style={{ width: 100 }}>
              {getAllStatus}
            </Select>
            <ErrorTips>{this.state.remittanceTypeError}</ErrorTips>
          </span>
          <span>
            货款项目<SpanStart>*</SpanStart>：
            <Select onChange={(values) => this.changePayStatus(values)} placeholder="请选择" style={{ width: 100 }}>
              {getPayGoodsStatus}
            </Select>
            <ErrorTips>{this.state.paymentProjectError}</ErrorTips>
          </span>
        </MoneyStatus>
        <div>
          <ManPer>
            <InputTime>
              汇款单位（人）
              <SpanStart>*</SpanStart>：
              <InputOne value={this.state.inUnit} onChange={(e) => this.onInput('inUnit', e.target.value)} />
              <ErrorTips>{this.state.inUnitError}</ErrorTips>
            </InputTime>
            <BankPri>
              汇出银行：<InputOne value = {this.state.outBank} onChange={(e) => this.onInput('outBank',e.target.value) }/>
            </BankPri>
            <span>
              汇出账号：<InputOne value={this.state.outNo} onChange={(e) => this.onInput('outNo',e.target.value)}/>
            </span>
          </ManPer>
          <ManPri>
            <SpansAnd>
              汇款金额<SpanStart>*</SpanStart> ：<InputYu value={this.state.inMoney} onChange={(e) => this.onInput('inMoney',e.target.value) } /><SpanYu>元</SpanYu>
              <ErrorTips>{this.state.inMoneyError}</ErrorTips>
            </SpansAnd>
            <PushUnsimplified>
              汇款金额（大写）：<InputUp disabled = {true} value={uppMoney} />
            </PushUnsimplified>
          </ManPri>
          <UpLoads>上传汇款单<SpanStart>*</SpanStart>：
            <Upload {...props} >
              <Button>
                <Icon type="upload" /> 选择文件
              </Button>
            </Upload>
          </UpLoads>
          <ErrorTips>{this.state.imageUrlError}</ErrorTips>
        </div>
        <ThreeDiv>
          <GetUni>收款单位（人）<SpanStart>*</SpanStart>：
            {/*<Select onChange={(values) => this.changeAllBank(values)} placeholder="请选择">*/}
              {/*{getAllBank}*/}
            {/*</Select>*/}
            <Select placeholder="请选择" onChange={this.handleProvinceChange}>
              {provinceOptions}
            </Select>
            <ErrorTips>{this.state.getUnitError}</ErrorTips>
          </GetUni>
          <InBankNo>
            <InBankSpans>
              汇入银行：<InBank value={this.state.InBank} disabled = {true} onChange={(e) => this.onInput('InBank',e.target.value) } />
              <ErrorTips>{this.state.InBankError}</ErrorTips>
            </InBankSpans>
            <span>
              银行账号：<InBank value={this.state.bankNo} disabled = {true} onChange={(e) => this.onInput('bankNo',e.target.value) } />
              <ErrorTips>{this.state.bankNoError}</ErrorTips>
            </span>
          </InBankNo>
          <TextDiv>
            <TextSpan>
              <span>备注：</span><TextIn value={this.state.remark} onChange={(e) => this.onInput('remark',e.target.value) } />
            </TextSpan>
          </TextDiv>
        </ThreeDiv>
        <SummitDiv>
          <SummitBut onClick={() => {this.addInBalance()}}>确定入账申请</SummitBut>
          <ResetBut onClick={() =>{this.changeShows()}}>取消</ResetBut>
        </SummitDiv>
      </Div>
    );

  }
}

InBalances.propTypes = {

};

export default InBalances;
