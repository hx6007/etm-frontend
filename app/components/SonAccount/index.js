/**
*
* SonAccount
*
*/

import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import './sonItem.css'



const Alink = styled(Link)``;

function SonAccount(props)  { // eslint-disable-line react/prefer-stateless-function
  console.log("propsssss",props);
  return (
    <tr className="Tr">
      <td className="tdFirst">{props.username2}</td>
      <td>{props.created_at}</td>
      <td>{props.memo}</td>
      <td>
        <span className="editTxt" onClick={(e) => {props.updateSonAccountList
      (props.username2)}}>修改</span>
        <span className="deleteTxt" onClick={() => props.removeSonAccountList
      (props.username2)}>删除</span>
      </td>
    </tr>
  );
}

SonAccount.propTypes = {

};

export default SonAccount;
