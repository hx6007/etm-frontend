/**
 *
 * MainBottom
 *
 */

import React from 'react';
import {HorizontalLayout, VerticalLayout} from "../Layout";
import styled from 'styled-components';
import GetPlatform from "../../components/GetPlatform";


const BottomBackground = styled.div`
  background-color: #aaa;
  font-size: 16px;
  color: white;
`
const BottomContainer = styled(VerticalLayout)`
  width: 1200px;
  margin: 0 auto;
`
const Contact= styled(HorizontalLayout)`
  justify-content: space-between;
  align-items: stretch;
  padding: 30px 0;
  border-bottom: 1px solid #eeeeee;
  
 `;
const Left= styled(VerticalLayout)`
  justify-content: space-between;
  
 `;
const Right= styled(VerticalLayout)`
 `;
const WebsiteInfo = styled(HorizontalLayout)`
    font-size: 14px;
    padding: 15px 0;
    justify-content: center;
    >a{
      color: #337ab7;
      text-decoration: none;
    }
`
const Code=styled.img`
  margin-top: 12px;
  width: 154px;
  height: 154px;
`


function MainBottom(props) {
  const platform = GetPlatform();
  return (
    <BottomBackground>
      <BottomContainer>
        <Contact>
          <Left >
            <span>招商热线：{platform.server_tel}</span>
            <span>客服热线：{platform.connect_tel}</span>
            <span>客服邮箱：{platform.server_email}</span>
            <span>地址：{platform.address}</span>
          </Left>
          {platform.service_code && <Right >
            <span>相关二维码</span>
            <Code src={platform.service_code} alt={platform.name}公众号/>
          </Right>}
        </Contact>
        <WebsiteInfo>
          COPYRIGHT © 2013-2017 {platform.company} 版权所有&nbsp;<a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">{platform.recordation}</a>
        </WebsiteInfo>
      </BottomContainer>
    </BottomBackground>
  );
}

MainBottom.propTypes = {};

export default MainBottom;
