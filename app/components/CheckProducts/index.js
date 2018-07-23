/**
*
* CheckProducts
*
*/

import React from 'react';
import styled from 'styled-components';
import { Select,Table } from 'antd';
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


export class  CheckProducts extends React.Component{


  changeLevel(values){
    console.log("values",values);
  }
  changeWarehouse(values){
    console.log("values",values);
  }

  render(){
    const levels = ["AAA","四级","一级","合格品"];
    const warehouses = ["江阴仓","天津仓","深圳仓","深圳分仓","南海仓","南海分仓","南京仓",
      "武汉仓","南宁仓","南宁分仓B","南宁分仓C","长沙仓","长沙分仓","重庆仓","重庆分仓","杭州仓",
      "福州仓","成都仓","佛山仓"
    ];
    const columns = [
      { title: '仓库', width: 130, dataIndex: 'warehouse', fixed: 'left', key: '1' },
      { title: '产品编号', dataIndex: 'productNo', key: '2' },
      { title: '产品名称', dataIndex: 'productName', key: '3' },
      { title: '产品系列', dataIndex: 'productSeries', key: '4' },
      { title: '品牌', dataIndex: 'brand', key: '5' },
      { title: '规格', dataIndex: 'spec', key: '6' },
      { title: '等级', dataIndex: 'level', key: '7' },
      { title: '色号', dataIndex: 'color', key: '8' },
      { title: '尺码', dataIndex: 'size', key: '9' },
      { title: '库存信息',
        key: '10',
        children: [{
          title: '库存量',
          dataIndex: 'stock',
          key: '11',
        }, {
          title: '单位',
          dataIndex: 'unit',
          key: '12',
          width: 100,
      }],
      }
    ];
    const data = [{
      key: '1',
      warehouse: '佛山仓',
      productNo: "MZD6150163",
      productName: '马赛克',
      productSeries: '香花梨系列',
      brand: '马兰欧尼',
      spec: '150',
      level: 'AAA',
      color: 'red',
      size: '222',
      stock: '123',
      unit: '箱',
    },{
      key: '2',
      warehouse: '佛山仓',
      productNo: "MZD6150163",
      productName: '马赛克',
      productSeries: '香花梨系列',
      brand: '马兰欧尼',
      spec: '150',
      level: 'AAA',
      color: 'red',
      size: '222',
      stock: '123',
      unit: '箱',
    }];
    const getAllLevels= levels.map(level => <Option key={level}>{level}</Option>);
    const getAllWarehouses= warehouses.map(warehouse => <Option key={warehouse}>{warehouse}</Option>);
    return (
      <div>
        <Divs>
          <span>
            产品编号：<InputOne type="text"/>
          </span>
          <SpanN>
            产品系列：<InputOne type="text"/>
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
          <SearchButton>查询</SearchButton>
        </Divs>
        <DivTable>
          <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
        </DivTable>
      </div>
    );

  }
}

CheckProducts.propTypes = {

};

export default CheckProducts;
