/**
 *
 * CheckProducts
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Select,Table } from 'antd';
import {getProductsPrice} from "../../utils/service";
const Option = Select.Option;

const Divs = styled.div`
   padding-left: 20px;
   .ant-select-selection--single{
     height: 27px;
     border-radius: 0;
   }
`;

const InputOne = styled.input`
  border: solid 1px #DEDFE0;
  height: 27px;
  width: 135px;
  background: #ffffff;
`;

const SpanN = styled.span`
  padding-left: 20px;
`;

const SearchButton = styled.button`
  background-color: #F8F8F8 ;
  color: #000;
  font-size: 13px;
  height: 27px;
  width: 60px;
  border: solid 1px #E7E8E9;
  cursor: pointer;
  padding-top: 5px;
  margin-left: 20px;
`;

const DivTable = styled.div`
  text-align: center;
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


export class  CheckPrice extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      matcode: "", //编号
      matname: "", //系列
      cv6: "", //等级
      stcode: "",//仓库
      customer_grade: "",//门店签约类型,登录时会返回(注册客户,签约客户,铂金客户)
      dataList: [],
      counts: "", //总条数
      pageNo: 1
    };
    this.getProData();
  }

  changeLevel(values){
    console.log("values",values);
    this.setState({cv6: values})
  }
  changeWarehouse(values){
    this.setState({stcode: values});
    console.log("values",values);
  }
  /**
   * 监听表单中的数据，保存到state中
   */
  onInput(key,value){
    console.log("监听数据",key,value);
    this.setState({
      [key]:value
    })
  }
  getProData(page) {
    const pageNo = page;
    let param = {
      clttype: this.props.clttype,
      cv6: this.state.cv6,
      stcode: this.state.stcode,
      matcode: this.state.matcode,
      matname: this.state.matname,
      customer_grade: this.props.customerGrade,
      page: pageNo||1,
    }
    getProductsPrice(param).then(data => {
      if(data.code === 1){
        this.setState({dataList: data.data.list,counts: data.data.count});
      }
      console.log("datadata",this.state.dataList);
    }).catch(error => {
      console.log(error);
    })
  }

  getProPrice(levels){
    let priJson = {};
    switch (levels){
      case 1:
        return priJson = {
          title: '元/片',
          dataIndex: 'price',
          key: '8',
          width: 100,
        };
      case 2:
        return priJson = {
          title: '元/片',
          dataIndex: 'VipPrice',
          key: '8',
          width: 100,
        };
      case 3:
        return priJson = {
          title: '元/片',
          dataIndex: 'Ptprice',
          key: '8',
          width: 100,
        };
    }
  }
  onChange = (page) => {
    this.setState({pageNo: page});
    this.getProData(page);
  };


  render(){
    const levels = ["AAA","四级品","一级品","合格品"];
    const warehouses = ["江阴仓","天津仓","深圳仓","深圳分仓","南海仓","南海分仓","南京仓",
      "武汉仓","南宁仓","南宁分仓B","南宁分仓C","长沙仓","长沙分仓","重庆仓","重庆分仓","杭州仓",
      "福州仓","成都仓","佛山仓"
    ];
    const columns = [
      { title: '仓库', width: 130, dataIndex: 'stcode', fixed: 'left', key: '1' },
      { title: '产品编号', dataIndex: 'matcode', key: '2' },
      { title: '产品系列', dataIndex: 'matname', key: '3' },
      { title: '规格', dataIndex: 'special', key: '4' },
      { title: '等级', dataIndex: 'CV6', key: '5' },
      { title: '包装箱/片', dataIndex: 'UOM', key: '6' },
      { title: '重量/KG', dataIndex: 'BaseWeight', key: '7' },
      this.getProPrice(this.props.levels),
    ];
    const data = this.state.dataList || [];
    const getAllLevels= levels.map(level => <Option key={level}>{level}</Option>);
    const getAllWarehouses= warehouses.map(warehouse => <Option key={warehouse}>{warehouse}</Option>);
    return (
      <div>
        <Divs>
          <span>
            产品编号：<InputOne value={this.state.matcode} onChange={(e) => this.onInput('matcode', e.target.value)} />
          </span>
          <SpanN>
            产品系列：<InputOne value={this.state.matname} onChange={(e) => this.onInput('matname', e.target.value)} />
          </SpanN>
          <SpanN>
            等级：<Select onChange={(values) => this.changeLevel(values)} placeholder="请选择" style={{ width: 100 }}>
            {getAllLevels}
          </Select>
          </SpanN>
          <SpanN>
            仓库：<Select onChange={(values) => this.changeWarehouse(values)} placeholder="请选择" style={{ width: 110 }}>
            {getAllWarehouses}
          </Select>
          </SpanN>
          <SearchButton onClick={() => this.getProData()}>查询</SearchButton>
        </Divs>
        <DivTable>
          <Table pagination={{
                   total: this.state.counts,
                   pageSize: 10,
                   current: this.state.pageNo,
                   onChange:(pageNo) => this.onChange(pageNo)
                 }}
                 columns={columns}
                 dataSource={data}
                 rowKey={'key'}
                 scroll={{ x: 1300 }} />
        </DivTable>
      </div>
    );

  }
}

CheckPrice.propTypes = {

};

export default CheckPrice;
