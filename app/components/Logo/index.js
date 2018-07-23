/**
*
* Logo
*
*/

import React from 'react';
import styled from 'styled-components';
import GetPlatform from "../../components/GetPlatform";
import {SITE_CODE} from "../../utils/serverUrl";
import {Link} from "react-router-dom";

const Image=styled.img`
  //width: 146px;
  height: 80px;
`;

function Logo() {
   const platform = GetPlatform();
  return SITE_CODE === "97ejk"?<Image src={platform.logo} alt={platform.name}/>:<Link to="/"><Image src={platform.logo} alt={platform.name}/></Link>;
}

Logo.propTypes = {
};

export default Logo;


