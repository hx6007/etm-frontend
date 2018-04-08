/**
 *
 * ProductListPage
 *
 */

import React from 'react';
import { Pagination, LocaleProvider } from 'antd';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {FilterItem} from "./FilterItem";
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProductListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ProductItem from "../../components/ProductItem/index";
import ListContainer from "./ListContainer";
import HtmlTitle from "../../components/HtmlTitle";
import MainBottom from "../../components/MainBottom";
import MainHead from "../../components/MainHead";
import {parseProductList} from "./productListConverter";
import Filter from "./Filter";
// import Paging from "./Paging";
import {Link} from 'react-router-dom';
import next from 'images/next.png';
import styled from 'styled-components';
import 'url-search-params-polyfill';
import {getMatcode, getProductList} from "../../utils/service";
import {
  makeSelectUserLevel, makeSelectProductHalls, makeSelectSiteCode, makeSelectUserIsValidate, makeSelectCategory,
  makeSelectWarehouse, makeSelectUserType
} from "../App/selectors";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {SITE_CODE} from "../../utils/serverUrl";


const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  .ant-pagination-item-active a{
    color: #FC461E;
  }
  .ant-pagination-item-active {
    border-color: #FC461E;
    font-weight: 500;
  }
  .ant-pagination-item:focus a, .ant-pagination-item:hover a {
    color: #FC461E;
  }
  .ant-pagination-item:focus, .ant-pagination-item:hover {
    -webkit-transition: all .3s;
    transition: all .3s;
    border-color: #FC461E;
  }
  .ant-pagination-prev:focus .ant-pagination-item-link, .ant-pagination-next:focus .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link, .ant-pagination-next:hover .ant-pagination-item-link {
    border-color: #FC461E;
    color: #FC461E;
  }
  .ant-pagination-jump-prev:focus:after, .ant-pagination-jump-next:focus:after, .ant-pagination-jump-prev:hover:after, .ant-pagination-jump-next:hover:after {
    color: #FC461E;
    display: inline-block;
    font-size: 12px;
    -webkit-transform: scale(0.66666667) rotate(0deg);
    -ms-transform: scale(0.66666667) rotate(0deg);
    transform: scale(0.66666667) rotate(0deg);
    letter-spacing: -1px;
  }

`;

const Button = styled.button`
  display: flex;
  background: #FC461E;
  color: #fff;
  height: 30px;
  width: 100px;
`;

const SpinDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
`;

const A = styled(Link)`
  text-decoration: none;
  color: #666666;
  padding-bottom: 50px;
`;

const NextImg = styled.img`
  height: 19px;
  width: 19px;
  margin: 0 10px 2px 10px;  
`;

const Span = styled.span`
  color: #737373;
`;

const TieDiv = styled.div`
  width: 1200px;
  margin: 30px auto 0 auto;
`;
const SearchDiv = styled.div`
  width: 1200px;
  margin: 30px auto 0 auto;
  font-size: 15px;
  display: flex;
`;
const SeaSpan = styled.span`
  padding: 0 10px;
`;




export class ProductListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = {
      productList: [],//商品列表{id,title,price,image}
      filterList:[],//筛选条件列表
      pageNo:1,//当前页
      filterListName: [],
      total_count:0,
      searchList:[],
      status: true,
      keyword: null,
      category_id: null,
      getParam: {}

    };
    //用户等级 用于判断价格 productHalls商品馆 siteCode平台代码
    //userLevel 游客1，注册会员2， vip3
    // const {userLevel,productHalls,siteCode}=props;
    // this.loadList(props)
  }

  /**
   * 跳转到第n页
   * */
  goPage(pageNumber) {
    window.scroll(0,0);
    this.setState({pageNo: pageNumber});
    const props =this.props;
    this.loadList(props)
    const search = this.props.location.search; // could be '?category=1&keyword=99'
    let params = new URLSearchParams(search);
    params.set("page", pageNumber);
    const url = this.props.location.pathname + '?' + params.toString();
    this.props.history.push(url);
    this.getCurrentPage();
  }


  /**
   * 获得当前页码
   * */
  getCurrentPage(){
    const search = this.props.location.search; // could be '?category=1&keyword=99'
    let params = new URLSearchParams(search);
    return parseInt(params.get("page"))||1;
  }

  getCategoryName(list,targetId) {
    for (const item of list) {
      if (targetId == item.name) {
        return item.name;
      }
      if(item.children){
        for(const childrens of item.children){
          if (targetId == childrens.name) {
            return childrens.name;}
          if(childrens.children != undefined && childrens.children) {
            for(const lastChildrens of childrens.children){
              if (targetId == lastChildrens.name) {
                return lastChildrens.name;}
            }
          }
        }
      }

    }
  }

  //获取分类数据
  getMatcode(param){
    let getParam = {
      warehouse: param.warehouse,
      matcode: param.search,
      doctype: param.site_code,
      // site_code: this.props.siteCode?,
      isLogin: param.userLevel,
      page: param.page,
      clttype: param.site_code,
    }
    getMatcode(getParam).then(data => {
      console.log("getMatcode",data)
      this.setState({status: false})
      if (data.code !== 1)throw '服务器数据错误'+ JSON.stringify(data);
      let productList = parseProductList(data.data.result);
      const total_count = data.data.count;
      // let filterList=data.data.filters === undefined ? [] : data.data.filters ;
      let keyword = param.search;
      this.setState({
        productList:productList,
        // filterList:filterList,
        keyword: keyword,
        total_count: total_count,

      });

    }).catch(e => {
      console.log(e);
      alert('加载出错')
    })
  };

  getSearchList(){
    const search = this.props.location.search; // could be '?category=1&keyword=99'
    const params = new URLSearchParams(search);
    let searchList = [];
    for(let search of params.entries()){
      if(search[0] !== "page" && search[0] !== "warehouse" && search[0] !== "category" && search[0] !== "search"){
        searchList.push(search)
      }
    }
    return searchList;
  }


  loadList(props=this.props){
    const search = props.location.search; // could be '?category=1&keyword=99'
    const params = new URLSearchParams(search);
    const allPrice = params.get("price");
    let arr = [];
    if(allPrice){
       arr = allPrice.split("-")
    }
    let getParam = {
      category_id: params.get('category'),
      search: params.get('search'),
      material_id: params.get("material_id"),
      color_id: params.get("color_id"),
      spec: params.get("special"),
      shape_id: params.get("shape_id"),
      water_absrp_rate_id: params.get("water_absrp_rate_id"),
      level: params.get("cv6"),
      userLevel: props.userLevel,
      minPrice: allPrice != null ? arr[0] : null,
      maxPrice: allPrice != null ? arr[1] : null,
      brand: params.get("material"),
      surface_craft_id: params.get("surface_craft_id"),//表面工艺
      warehouse: props.warehouse||'佛山仓',//表面工艺
      special_supply: params.get("isfor"),//是否专供
      page: params.get("page")||"1",
      site_code: props.type,
      product_hall_id:props.productHalls,
      is_validat:props.is_validate,//非会员0, 会员为1,白金为2, 不传值为面价
    };
    if(getParam.search != null){
      this.getMatcode(getParam);
    }else{
      console.log("getParam",getParam);
      getProductList(getParam).then(data => {
        this.setState({status: false})
        console.log("list",data);
        if (data.code !== 1)throw '服务器数据错误';
        let productList = parseProductList(data.data.result);
        const total_count = data.data.count;
        let filterList=data.data.filters === undefined ? {} : data.data.filters ;
        let categoryName = getParam.category_id;
        this.setState({
          productList:productList,
          filterList:filterList,
          total_count: total_count,
          category_id: categoryName
        });

      }).catch(e => {
        console.log(e);
        alert('加载出错')
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    this.loadList(nextProps)
  }

  /**
   * 参数该改变 更新路由
   */
  updateUrlParam(key) {
    const search = this.props.location.search; // could be '?category=1&keyword=99'
    let params = new URLSearchParams(search);
   params.delete(key);
   console.log(params.toString());
    const url = this.props.location.pathname + '?' + params.toString();
    this.props.history.push(url);
  }

  render() {
    let categoryName=this.state.category_id;
    let searchlistfilters = this.getSearchList().map((item, index) => {
      if(this.props.userLevel == 0){
        if(item[1] =="是"||item[1] =="否"){
          alert("“是否专供”需登录后才能选择");
          this.props.history.push('/login');
        }
      }
        const isChecked = item;
        return <FilterItem key={index} checked={isChecked} onClick={e => {e.preventDefault(); this.updateUrlParam(item[0])}}>{item[1]}</FilterItem>
        });
    return (
      <div>
        <HtmlTitle/>
        <MainHead />
        <TieDiv><A to="/">首页</A><NextImg src={next}/><Span>{categoryName}</Span></TieDiv>
        {searchlistfilters.length>0 && <SearchDiv>全部结果：
          {searchlistfilters}
        </SearchDiv>}
        <Filter filters={this.state.filterList} location={this.props.location} history={this.props.history}/>
        <ListContainer>{this.state.productList.length>0?
          this.state.productList.map((item,index) =>
          <ProductItem userLevel={this.props.userLevel} key={"product"+item.sku_id+index} id={item.id} title={item.title} price={item.price} image={item.image} unit={item.unit} />
          ): this.state.status ? <SpinDiv> <Spin/> </SpinDiv> : this.state.keyword != null ? "查找不到这个类似的相关的产品，请确认产品关键词" : "无数据" }</ListContainer>
        <LocaleProvider locale={zhCN}>
          <Div>
            <Pagination showQuickJumper defaultCurrent={1} defaultPageSize={20} showTotal={total => `共${total}个商品`} total={this.state.total_count} onChange={this.goPage.bind(this)} />
          </Div>
        </LocaleProvider>
        <MainBottom />
      </div>
    );
  }
}

ProductListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  productlistpage: makeSelectProductListPage(),
  userLevel: makeSelectUserLevel(),
  productHalls: makeSelectProductHalls(),
  is_validate:makeSelectUserIsValidate(),
  siteCode: makeSelectSiteCode(),
  category: makeSelectCategory(),
  warehouse: makeSelectWarehouse(),
  type: makeSelectUserType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'productListPage', reducer });
const withSaga = injectSaga({ key: 'productListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductListPage);
