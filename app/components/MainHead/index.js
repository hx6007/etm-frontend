/**
 *
 * MainHead
 *
 */

import React from 'react';
import {HorizontalLayout} from "../Layout";
import styled from 'styled-components';
import MainTopBar from "../MainTopBar";
import Logo from "../Logo";
import SearchBar from "../SearchBar";
import Menu from "../Menu";

import {Route} from "react-router-dom";

const SearchBarContainer = styled(HorizontalLayout)`
  width: 1200px;
  justify-content: space-between;
  padding: 30px 0;
  margin: 0 auto;
`;


function MainHead(props) {
  return (
    <div>
      <MainTopBar/>
      <SearchBarContainer>
        <Logo/>
        <Route  component={SearchBar} />
      </SearchBarContainer>
      <Menu/>
    </div>
  );
}

MainHead.propTypes = {};

export default MainHead;
