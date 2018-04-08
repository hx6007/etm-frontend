import styled,{ css } from "styled-components";


const checkedStyle=css`
   border: 2px solid rgba(80,80,0,0.4);
    background:rgba(80,80,0,0.05);
    ${props => props.type !== 'radio' && `
    &:after{
    content:'  ×'
    }`
  }
`;

export const FilterItem = styled.div`
  cursor: pointer;
  margin: -3px 0 4px 12px;
  border-radius: 20px;
  color: #333;
  padding:  ${props => props.checked ? '2px 10px;' : '4px 12px'};
    ${props => props.checked && checkedStyle}
  &:hover,&:focus,&:active{
    background: rgba(0,0,0,.1);
  }  
`;

