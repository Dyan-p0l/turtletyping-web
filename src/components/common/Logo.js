import React from "react";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";
import logo from '../../img/logoweb.png';

const Logo = () => {

  return (
    <div className="header">
            <h1 style={{fontFamily: 'Lexend Deca', color: 'rgb(229, 247, 239)', fontSize: 45}}  >
            TurtleType<img src={logo} alt="Logo" style={{ width: '125px', height: '125px' }}/> 
            </h1>
            <span className="sub-header">   
                a minimalistic typing test website for coders
            </span>
    </div>
  );
};

export default Logo;
