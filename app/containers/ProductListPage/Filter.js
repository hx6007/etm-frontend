/**
 *
 * Filter
 *
 */

import React from 'react';
import styled from 'styled-components';
import FilterRow from "./FilterRow";
import {Body} from "../../components/Layout";
import {warehouses} from "../../utils/warehouse";
import {FilterItem} from "./FilterItem";
import 'url-search-params-polyfill';
import {connect} from "react-redux";
import {compose} from "redux";
import {updateSpecialSupply, updateWarehouse} from "../App/actions";
import {createStructuredSelector} from 'reselect';
import {makeSelectCategory, makeSelectUserLevel, makeSelectWarehouse} from "../App/selectors";


const Input = styled.input`
  border: 1px solid #666;
  width: 60px;
  font-size: 14px;
  padding: 0 8px;
  height: 25px;
  margin: 0 10px;
`;

const Button = styled.button`
  background: #FC461E;
  color: #fff;
`;


class Filter extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = {
      lowPrice: '',//最低价
      upperPrice: ''//最高价
    }
  }

  /**
   * 获取特定筛选列表
   * @param filterListTotal 总筛选列表
   * @param filterName 筛选列表名称
   * @param checkedId
   */
  getFilterList(filterListTotal, filterName, checkedId) {
    let list = [];
    if(filterListTotal.length > 1){
      for (const filterList of filterListTotal) {
        // A--优等品，B--一级品、C--合格品、D---四级品
        if (filterList.title === filterName) {
          list = filterList.value.map((item,index) => {
            const isChecked = checkedId == item;
            // let name = item.name;
            // if (filterName === '等级') {
            //   name = this.changeLevelName(name);
            // }
            return <FilterItem key={index} checked={isChecked}
                               onClick={e => {
                                 e.preventDefault();
                                 this.updateUrlParam(filterList.name, isChecked ? null : item);
                               }}>{item}</FilterItem>
          });
          break;
        }
      }

    }

    // switch (filterName){
    //   case "规格":
    //     return
    // }
    // let level;
    //
    // if(filterListTotal.special && filterName == "规格"){
    //   list = filterListTotal.special.map((item,index) => {
    //     const isChecked = checkedId == item;
    //     return <FilterItem key={"special"+index} checked={isChecked}
    //             onClick = {e => {
    //               e.preventDefault();
    //               this.updateUrlParam("special", isChecked ? null : item)
    //             }}
    //            >{item}</FilterItem>
    //   });
    // }else if(filterListTotal.cv6 && filterName == "等级"){
    //   list = filterListTotal.cv6.map((item,index) => {
    //     // level= this.changeLevelName(item);
    //     const isChecked = checkedId == item;
    //     return <FilterItem key={"cv6"+index} checked={isChecked}
    //                        onClick = {e => {
    //                          e.preventDefault();
    //                          this.updateUrlParam("cv6", isChecked ? null : item)
    //                        }}
    //            >{item}</FilterItem>
    //   });
    // }else if(filterListTotal.material && filterName == "品牌"){
    //   list = filterListTotal.material.map((item,index) => {
    //     const isChecked = checkedId == item
    //     return <FilterItem key={"material"+index} checked = {isChecked}
    //              onClick = {e => {
    //                e.preventDefault();
    //                this.updateUrlParam("material", isChecked ? null : item)
    //              }}
    //            >{item}</FilterItem>
    //   });
    // }
    return list;
  }


  changeLevelName(name) {
    switch (name) {
      case 'AAA':
        return '优等品';
      case 'B':
        return '一级品';
      case 'C':
        return '合格品';
      case 'D':
        return '四级品';
      default:
        return name;
    }
  }

  render() {
    //console.log('Filter Render') todo 修改选中参数 会渲染筛选条件两次 此处有优化空间
    const search = this.props.location.search; // could be '?category=1&keyword=99'
    const params = new URLSearchParams(search);
    // const material_id = params.get('material_id');
    // const color_id = params.get('color_id');
    const special = params.get('special');
    // const shape_id = params.get('shape_id');
    // const water_absrp_rate_id = params.get('water_absrp_rate_id');
    // const surface_craft_id = params.get('surface_craft_id');
    const material = params.get('material');
    const cv6 = params.get('cv6');
    const special_supply = params.get('isfor');
    const warehouse = this.props.warehouse;
    const filters = this.props.filters;
    // const materialList = this.getFilterList(filters, '材质', material_id);
    // const colorList = this.getFilterList(filters, '颜色', color_id);
    const specList = this.getFilterList(filters, '尺寸', special);
    // const shapeList = this.getFilterList(filters, '形状', shape_id);
    // const waterList = this.getFilterList(filters, '吸水率', water_absrp_rate_id);
    // const craftList = this.getFilterList(filters, '表面工艺', surface_craft_id);
    const brandList = this.getFilterList(filters, '品牌', material);
    const levelList = this.getFilterList(filters, '等级', cv6);
    const warehouseList = this.getWarehouseList(warehouse);
    const specialsupplyList =  this.getSpecialSupply(special_supply);
    return (
      <Body>
      {/*{materialList.length > 0 && <FilterRow title='材质'>{materialList}</FilterRow>}*/}
      {/*{colorList.length > 0 && <FilterRow title='颜色'>{colorList}</FilterRow>}*/}
      {specList.length > 0 && <FilterRow title='规格'>{specList}</FilterRow>}
      {/*{shapeList.length > 0 && <FilterRow title='形状'>{shapeList}</FilterRow>}*/}
      {/*{waterList.length > 0 && <FilterRow title='吸水率'>{waterList}</FilterRow>}*/}
      {/*{craftList.length > 0 && <FilterRow title='表面工艺'>{craftList}</FilterRow>}*/}
      {brandList.length > 0 && <FilterRow title='品牌'>{brandList}</FilterRow>}
      {levelList.length > 0 && <FilterRow title='等级'>{levelList}</FilterRow>}
      <FilterRow title='仓库'>{warehouseList}</FilterRow>
      {this.props.userLevel != 0 ? <FilterRow title='是否专供'>{specialsupplyList}</FilterRow> : '' }

      <FilterRow title='价格'>
        <Input type="number" min="0" placeholder="最低价" onChange={e => {
          this.setState({lowPrice: e.target.value})
        }}/>-
        <Input type="number" min="0" placeholder="最高价" onChange={e => {
          this.setState({upperPrice: e.target.value})
        }}/>
        <Button onClick={e => this.setInputPrice()}>确定</Button></FilterRow>
      </Body>
    );
  }

  componentWillReceiveProps(nextProps){
    const oldSpecialSupply=this.getUrlSpecialSupply(this.props.location.search);
    const newSpecialSupply=this.getUrlSpecialSupply(nextProps.location.search);
    if(oldSpecialSupply!==newSpecialSupply){
      this.props.updateSpecialSupply(newSpecialSupply);
    }
  }

  getUrlWarehouse(search){
    const params = new URLSearchParams(search);
    return params.get('warehouse');
  }

  getUrlSpecialSupply(search){
    const params = new URLSearchParams(search);
    return params.get('isfor');
  }

  setInputPrice() {
    const lowPrice = this.state.lowPrice.trim();
    const upperPrice = this.state.upperPrice.trim();
    const value = lowPrice + '-' + upperPrice;
    this.updateUrlParam('price', value.length > 1 ? value : null);
  }


  /**
   * 获取仓库列表元素
   */
  getWarehouseList(checkedWarehouse) {
    return warehouses.map((item) =>
      <FilterItem key={item} checked={item === checkedWarehouse} type='radio'
                  onClick={e => {
                    this.props.updateWarehouse(item)
                  }
                  }>{item}</FilterItem>
    );
  }

  /**
   *
   * 是否专供
   */
  getSpecialSupply(checkedSpecialSupply){
    return ['是','否'].map((items) =>
      <FilterItem key={items} checked={items === checkedSpecialSupply} type='radio'
                  onClick={e => {
                    this.updateUrlParam('isfor', items);
                  }
                  }>{items}</FilterItem>
    );
  }


  /**
   * 参数该改变 更新路由
   */
  updateUrlParam(key, value) {
    const search = this.props.location.search; // could be '?category=1&keyword=99'
    let params = new URLSearchParams(search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const url = this.props.location.pathname + '?' + params.toString();
    this.props.history.push(url);
  }


}

Filter.propTypes = {};

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  userLevel: makeSelectUserLevel(),
  warehouse: makeSelectWarehouse(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateWarehouse: (warehouse) => dispatch(updateWarehouse(warehouse)),
    updateSpecialSupply: (special_supply) => dispatch(updateSpecialSupply(special_supply)),
  };
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Filter);

