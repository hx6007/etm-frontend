import styled,{css} from "styled-components";
import {NavLink} from "react-router-dom";

const linkCss = css`
  display:inline-block;
  position: relative;
  width:150px;
  text-align: left;
  font-size: 15px;
  line-height: 40px;
  margin-bottom: 40px;
  text-decoration: none;
  color: ${props => props.id ? '#5396dd' : '#666666'};
  cursor:pointer;
  
`;

export const MyNavItem=styled(NavLink)`
  ${linkCss}
  
`;
export const OuterNavItem=styled.a`
  ${linkCss}
`;
