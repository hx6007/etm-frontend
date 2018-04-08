/**
*
* AddressItem
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import editPng from 'images/edit.png';
import deletePng from 'images/delete.png';
import {Link} from 'react-router-dom';


const Tr = styled.tr`
  width: 100%;
  text-align: left;
  border-bottom: solid 0.1px #ccc;
  height: 50px;
`;

const TdA = styled.span`

`;

const EditIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;
`;

const DeleteIcon = styled.img`
  width: 23px;
  height: 23px;
  cursor: pointer;
`;

AddressItem.propTypes = {
  id: PropTypes.any.isRequired,
  name: PropTypes.string,
  tel: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  removeAddressList:PropTypes.func,
  updateAddressList:PropTypes.func
};

function AddressItem(props) {
  return (
    <Tr>
      <td>{props.consignee}</td>
      <td>{props.phone_number}</td>
      <td>{props.telephone}</td>
      <td>{props.address}</td>
      <td><DeleteIcon src={deletePng} onClick={() => props.removeAddressList(props.id)}/><TdA><EditIcon src={editPng} onClick={(e)=>{props.updateAddressList(props.id)}}/></TdA></td>
      <td>{props.isflag === "true" && <span>默认地址</span>}{props.isflag != "true" && <span onClick={(e)=>{props.updateAddressList(props.id)}}>设置为默认地址</span>}</td>
    </Tr>
  );
}

export default AddressItem;


