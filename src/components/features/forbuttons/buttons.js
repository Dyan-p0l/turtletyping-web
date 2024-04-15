// IconButtonSet.js
import React from "react";
import IconButton from "../../utils/IconButton";

const IconButtonSet = ({ handleIconButtonClick }) => {
  return (
    <div className="IconButton-set">
      <IconButton id="DEF" style={{ marginLeft: '15px', fontFamily:"Lexend Deca", fontWeight:"600"}}>Default</IconButton>
      <IconButton id="C" style={{fontFamily:"Lexend Deca", fontWeight:"600"}}>C</IconButton>
      <IconButton id="CPP" style={{fontFamily:"Lexend Deca", fontWeight:"600"}}>C++</IconButton>
      <IconButton id="JAVA" style={{fontFamily:"Lexend Deca", fontWeight:"600"}}>Java</IconButton>
      <IconButton id="PY" style={{ marginRight: '15px', fontFamily:"Lexend Deca", fontWeight:"600"}}>Python</IconButton>
    </div>
  );
};

export default IconButtonSet;
