/**
 *
 * SearchBar
 *
 */

import React from 'react';
import styled from 'styled-components';
import icSearch from 'images/menu/search.png';
import {Link} from "react-router-dom";
import {getProductSearch} from 'utils/service.js';
import {connect} from "react-redux";
import {compose} from "redux";
import {createStructuredSelector} from 'reselect';
import {makeSelectWarehouse} from "../../containers/App/selectors";
import {SITE_CODE} from "../../utils/serverUrl.js";
import 'url-search-params-polyfill';


function getSearchColor() {
  switch (SITE_CODE){
    default:
    case "51etm":
      return "#c52341";
    case "97ejk":
    case  "like_peach":
      return "#412517";
    case "51exc":
      return "#278976";
    case "kiki":
      return "#595656";
    case "51ecg":
      return "#84a93d";
    case "97efx":
      return "#ecb736";
    case "ezz168":
      return "#81c13d";
    case "168ezc":
      return "#65c2c9";
    case "maqiduo":
      return "#1065af";
    case "lola_ceramics":
      return "#2a1608";
  }
}

const Form = styled.form`
  @-webkit-keyframes twinkling{
	0%{
		margin-right: 0;
	}
	25%{
		margin-right: 15px;
	}
	50%{
		margin-right: 0;
	}
	75%{
		margin-right: 15px;
	}
	100%{
		margin-right: 0;
	}
}
background: ${getSearchColor(SITE_CODE)} ;
  //background: #c52242;
  display: inline-flex;
  justify-content: stretch;
  ${props=>props.error&&`
  -webkit-animation: twinkling 1s  ease-in-out;
  `}


`;
const Input = styled.input`
  background-color: white;
  padding: 8px;
  margin: 2px;
  border: none;
  outline:none;
  min-width: 400px;
`;

function SearchButton(props) {
  const ImgContainer = styled.div`
  padding: 0 15px;
  flex: 1;
  display: flex;
  cursor: pointer;
  align-items: center;
`;
  return (
    <ImgContainer {...props} >
      <img src={icSearch} alt="搜索"/>
    </ImgContainer>
  )
}

const Label = styled(Link)`
  text-decoration: none;
  margin: 0 25px 0 0;
  font-size: 14px;
  color: #999;
  &:hover,&:focus,&:active{
    color: #c52242;
  }
`;



class SearchBar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      keyword:"",
      empty:false,
      check: ""
    }
  }

  /**
   * 监听搜索框中的数据，保存到state中
   */
  onInput(key,value){
    this.setState({
      [key]:value,
      check: value
    })
  }

  /**
   * 点击搜索，改变地址参数
   */
  searchClick(search){
    const w = window.open('about:blank');
    w.location.href = `/productList?search=${search}`;
    // this.props.history.replace(`/productList?keyword=${keyword}`);
    if(this.state.check){this.setState({keyword:""})}
  }

  /**
   * 表单提交触发时的事件
   */
  getSubmit(e){
    e.preventDefault();
    const keyword=this.state.check.trim();
    this.goSearch(keyword);
  }

  goSearch(keyword){
    if(keyword){
      this.searchClick(keyword);
    }else {
      this.setState({
        empty:true,
      });
      setTimeout(()=>{
        this.setState({
          empty:false,
        });
      },1000)
    }
  }


  render(){
    const search = this.props.location.search; // could be '?category=1&keyword=99'
    const params = new URLSearchParams(search);
    const searchBar = params.get("search");
    return (
      <div>
        <Form onSubmit = {e => this.getSubmit(e)} error={this.state.empty}>
          <Input type="text"  placeholder="请输入关键字" defaultValue={searchBar} onChange={(e)=>this.onInput('keyword',e.target.value)} />
          <SearchButton onClick = {e => {this.getSubmit(e)}}/>
        </Form>
        <div>
          <Label to='/productList?category=瓷砖' target="_blank">瓷砖</Label>
          <Label to='/productList?category=马赛克' target="_blank">马赛克</Label>
          <Label to='/productList?category=进口砖' target="_blank">进口砖</Label>
          <Label to='/productList?category=仿古砖' target="_blank">仿古砖</Label>
          <Label to='/productList?category=全抛釉' target="_blank">全抛釉</Label>
          <Label to='/productList?category=抛光砖' target="_blank">抛光砖</Label>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {};

const mapStateToProps = createStructuredSelector({
  warehouse: makeSelectWarehouse()
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(SearchBar);





