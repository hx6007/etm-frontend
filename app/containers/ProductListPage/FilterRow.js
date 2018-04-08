/**
 *
 * Filter
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {HorizontalLayout} from "../../components/Layout";


const Row = styled(HorizontalLayout)`
  border-bottom: 1px dashed #cccccc;
  min-height: 40px;
  padding-top: 13px;
`;
const Title = styled.div`
  display: flex;
  color: #666;
  width: 85px;
`;
const Container = styled(HorizontalLayout)`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`;

function FilterRow(props) {
  return (
    <Row>
      <Title>{props.title}：</Title>
      <Container>{props.children}</Container>
    </Row>
  );
}

FilterRow.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FilterRow;


