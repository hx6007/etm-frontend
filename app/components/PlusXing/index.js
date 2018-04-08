/**
*
* PlusXing
*
*/

import React from 'react';
// import styled from 'styled-components';


function PlusXing (str,frontLen,endLen) { 
	str = str ? str : "";
	if(str === "") return " ";
	var len = str.length-frontLen-endLen;
	var xing = '*';
		for (var i=1;i<len;i++) {
		xing+='*';
	}
	const frontstr = str.substring(0,frontLen);
	const endstr = len > 0 ? str.substring(str.length-endLen) : "";
	return frontstr+xing+endstr;
}

PlusXing.propTypes = {

};

export default PlusXing;
