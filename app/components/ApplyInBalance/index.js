/**
*
* ApplyInBalance
*
*/

import React from 'react';
import styled from 'styled-components';
import { DatePicker,Table, Modal } from 'antd';
import {getBillOrder} from "../../utils/service";




const OrderStatus = styled.div`
  display: flex;
  
`;
const OrDiv = styled.div`
  display: flex;
`;
const OrdersD = styled.div`
  border: solid #F0F0F0 1px ;
  //padding: 5px 10px;
  height: 24px;
  //padding-left: 10px;
  font-size: 13px;
  padding: 2px 15px;
  cursor: pointer;
  background: ${props => props.checked ? "#235694": "#fff" };
  color: ${props => props.checked ? "#fff": "#000" };

`;

const NewAdd = styled.div`
  border: solid #F0F0F0 1px ;
  //padding: 5px 10px;
  height: 24px;
  //padding-left: 10px;
  font-size: 13px;
  padding: 2px 15px;
  cursor: pointer;
  background: #009B3A;
  color: #ffffff;
  margin-left: 20px;
`;

const Spans = styled.span`
  padding-left: 20px;
`;

const DDiv = styled.div`
  padding-top: 30px;
  .ant-input{
    height: 25px;
    border-radius: 0;
  }
`;

const Inputs = styled.input`
  height: 25px;
  width: 150px;
  border: solid 1px #D9D9D9;
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

const DivTable = styled.div`
  margin: 20px 5px 5px 5px;
  border: solid #E9E9E9 1px;
  .ant-table-thead > tr > th{
    background: #F8F8F8;
    padding: 11px 14px;
    border: solid 1px #E9E9E9; 
    color: #8D8F92;
  }
  .ant-table-tbody > tr > td{
    border: solid 1px #E9E9E9; 
    background: #fff;
  }
  .ant-table-tbody > tr > td{
    padding: 11px 14px;
  }
`;

export class  ApplyInBalance extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      choose: 1,
      states: "",
      startTimes: "",
      endTimes: "",
      billOrderNo:"",
      billOrderList:[],
      previewVisible: false,
      previewImage: '',
    };
    this.getBillData();
  }

  changeOrderStatus(status,no){
    this.setState({choose: no,states: status});
    this.getBillData(status)
  }
  onChangeStart(value, dateString){
    this.setState({startTimes: dateString})
  }

  onChangeEnd(value, dateString){
    this.setState({endTimes: dateString})
  }

  onOk() {
  }

  changeShow(){
    this.props.changeInBa("false")
  }

  /**
   * 监听表单中的数据，保存到state中
   */
  onInput(key,value){
    this.setState({
      [key]:value
    })
  }

  getBillData(states){
    const statuss = states === "click" ? this.state.states: states||"";
    const {customerNo} = this.props;
    const state = statuss;
    const startTime = this.state.startTimes;
    const emdTime = this.state.endTimes;
    const bankcode = this.state.billOrderNo;
    let param = {
      customerNo: customerNo,
      state: state,
      startTime: startTime,
      emdTime: emdTime,
      bankcode: bankcode
    };
    getBillOrder(param).then(data => {
      if(data.code === 1){
        this.setState({billOrderList: data.data.list})
      }
    }).catch(error =>{
      console.log(error);
    })

  }

  handleCancel = () => this.setState({ previewVisible: false })

  lookBigImg(text){
    this.setState({
      previewImage: text || "",
      previewVisible: true,
    });
  }

  render(){
    const columns = [
      { title: '申请单号', width: 130, dataIndex: 'doccode', fixed: 'left', key: '1' },
      { title: '汇款单位（人）', dataIndex: 'companyname2', key: '2' },
      { title: '提交日期', dataIndex: 'EnterDate', key: '3' },
      { title: '汇款金额', dataIndex: 'summoney', key: '4' },
      { title: '汇入银行', dataIndex: 'cashName', key: '5' },
      { title: '汇入账号', dataIndex: 'bankcode', key: '6' },
      { title: '财务审核时间', dataIndex: 'PostDate', key: '7' },
      { title: '入账申请图', dataIndex: 'file_key', key: '8', render: (text)=>{
        return (<div onClick={() => this.lookBigImg(text) }><img width="30" height="30" src={text}/></div>)
      } },

      {
        title: '备注',
        key: '9',
        width: 130,
        dataIndex: 'HDText'
      },
    ];
    const data = this.state.billOrderList;
    return (
      <div>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
        <OrderStatus>
          <OrDiv>单据状态：<OrdersD checked={this.state.choose === 1} onClick={() => {this.changeOrderStatus("",1)}}>所有</OrdersD></OrDiv>
          <OrdersD checked={this.state.choose === 2} onClick={() => {this.changeOrderStatus("起草",2)}}>起草</OrdersD>
          <OrdersD checked={this.state.choose === 3} onClick={() => {this.changeOrderStatus("待财务审核",3)}}>待处理</OrdersD>
          <OrdersD checked={this.state.choose === 4} onClick={() => {this.changeOrderStatus("审核完",4)}}>已处理</OrdersD>
          <NewAdd onClick={() => {this.changeShow()}} >新建入账申请</NewAdd>
        </OrderStatus>
        <DDiv>
          开始日期：<DatePicker placeholder="年/月/日"
                           format="YYYY-MM-DD"
                           onChange={(value, dateString) => this.onChangeStart(value, dateString)}
                           onOk={this.onOk()} />
          <Spans>
            到：<DatePicker placeholder="年/月/日"
                          format="YYYY-MM-DD"
                          onChange={(value, dateString) => this.onChangeEnd(value, dateString)}
                          onOk={this.onOk()} />

          </Spans>
          <Spans>
            单号：<Inputs value={this.state.billOrderNo} onChange={(e) => this.onInput('billOrderNo', e.target.value)}/>
          </Spans>
          <Spans><SearchButton onClick={() => this.getBillData("click")} >查询</SearchButton></Spans>
        </DDiv>
        <DivTable>
          <Table columns={columns}
                 rowKey={'doccode'}  dataSource={data} scroll={{ x: 1300 }} />
        </DivTable>
      </div>
    );

  }
}

ApplyInBalance.propTypes = {

};

export default ApplyInBalance;
