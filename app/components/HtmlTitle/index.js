/**
*
* HtmlTitle
*
*/

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import GetPlatform from "../../components/GetPlatform";
// import styled from 'styled-components';

/**
 * 修改页面标题
 * @param props
 * @returns {XML}
 * @constructor
 */
function HtmlTitle(props){
  const platform = GetPlatform();
  return (
    <Helmet>
      <title>{props.title ? props.title : platform.name + platform.title}</title>
      <meta name="description" content={platform.name + platform.title} />
      {/*百度统计代码*/}
    	<script type="text/javascript">
    	{`${platform.baidutj}`}
    	</script>
    </Helmet>
  );
}

HtmlTitle.propTypes = {};

export default HtmlTitle;
