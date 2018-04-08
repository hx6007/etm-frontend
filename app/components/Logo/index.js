/**
*
* Logo
*
*/

import React from 'react';
import styled from 'styled-components';
import GetPlatform from "../../components/GetPlatform";

const Image=styled.img`
  width: 146px;
  height: 80px;
`;

function Logo() {
   const platform = GetPlatform();
  return (
    <Image src={platform.logo} alt={platform.name}/>
  );
}

Logo.propTypes = {
};

export default Logo;


