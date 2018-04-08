/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import MainHead from "../../components/MainHead";
import MainBottom from "../../components/MainBottom";
import NotFoundImg from "../../images/notfoundimg.png"
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
// const { Header, Footer, Content } = Layout;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: space-between;
  justify-content: center;
  flex: 1;
`
const NotFoundLayout = styled(Layout)`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`
const NotFoundLogo = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const TextDiv = styled.div`
  margin: 0 0 0 20px;
`

const A = Link;


export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <NotFoundLayout>
        <MainHead/>
        <Content>
          <NotFoundLogo>
            <img src={NotFoundImg}/>
            <h1>404</h1>
          </NotFoundLogo>
          <TextDiv>
            <p>
              很抱歉,你所访问的页面不存在或者已删除<br/>
              <li>请确认网址输入是否正确</li>
              <li><A to={"/"}>返回首页</A></li>
            </p>
          </TextDiv>
        </Content>
        <MainBottom/>
      </NotFoundLayout>
    );
  }
}
