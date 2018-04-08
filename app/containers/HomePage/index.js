/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import HtmlTitle from "../../components/HtmlTitle";
import GetPlatform from "../../components/GetPlatform";
import MainHead from "../../components/MainHead";
import MainBottom from "../../components/MainBottom";

const IframeHomePage = styled.iframe`
  width: 100%;
  min-height:300px;
  height: 100%;
  border: none;
`;

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const platform = GetPlatform();
    const adorigin = "http://ad.lolatc.com";
    const adindex = (location.pathname==="/") ? platform.adindex : this.props.match.params.topicId;
    window.addEventListener('message', function(event) {
      console.log(event);
      if(event.origin === adorigin) {
        document.getElementById("Iframediv").style.height = event.data + "px";
      }
    }, false);
    const adurl = `${adorigin}/pages/${adindex}/sections?api_path=${location.origin}`
    return (
      <div>
        <HtmlTitle title={platform.name + platform.title}/>
        <MainHead />
          <div>
            {adindex && <IframeHomePage src={adurl} id="Iframediv" />}
          </div>
        <MainBottom />
      </div>
    );
  }
}


