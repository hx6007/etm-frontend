/**
*
* Layout
*
*/

import React from 'react';
import styled from 'styled-components';

/**
 * 垂直布局 控件从上至下排列
 */
export const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * 横向布局 控件从左至右排列
 */
export const HorizontalLayout= styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

/**
 * 宽为1200像素，页面居中的容器
 */
export const Body=styled.div`
  width: 1200px;
  margin: 10px auto 30px auto;
`;
