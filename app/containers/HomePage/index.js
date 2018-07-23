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
import {SITE_CODE} from "../../utils/serverUrl";


const IframeHomePage = styled.iframe`
  width: 100%;
  min-height:300px;
  height: 100%;
  border: none;
`;


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(){
    super();
    this.state = {
      adId: ""
    };
  }

  getSiteCode(SITE_CODE){
    switch (SITE_CODE){
      default:
      case "51etm":
        return "etm";
      case "97ejk":
        return "ejk";
      case "like_peach":
        return "ytmw";
      case "51exc":
        return "exc";
      case "kiki":
        return "kiki";
      case "51ecg":
        return "ezg";
      case "97efx":
        return "efx";
      case "ezz168":
        return "ezz";
      case "168ezc":
        return "ezc";
      case "maqiduo":
        return "mqd";
      case "lola_ceramics":
        return "taoci";
    }
  }


  render() {
    const platform = GetPlatform();
    const adorigin = "http://as.heyiit.com";
    const anotherAdindex = (location.pathname==="/") ? this.state.adId : this.props.match.params.topicId;
    window.addEventListener('message', function(event) {
        console.log("height",event.data);
      if(event.origin === adorigin) {
        document.getElementById("Iframediv").style.height = event.data + "px";
      }
    }, false);
    const anotherAdurl = `${adorigin}/f_index?id=${anotherAdindex}&siteCode=${this.getSiteCode(SITE_CODE)}&location=index&api_path=${location.origin}`;
    console.log("anotherAdurl",anotherAdurl);
    return (
      <div>
        <HtmlTitle title={platform.name + platform.title}/>
        <MainHead />
          <div>
            <IframeHomePage src={anotherAdurl} id="Iframediv" scrolling="no" />
          </div>
        <MainBottom />
      </div>
    );
  }
}


