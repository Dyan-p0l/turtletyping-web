import React from "react";
import logo from '../../img/logoweb.png';
import logosvg from '../../img/logowebsvg2.svg';

const Logo = () => {

  return (
    <div className="header">
            <h1 style={{fontFamily: 'Lexend Deca', color: '#FFFFFF', fontSize: 45}}  >
            TurtleType<img src={logo} alt="Logo" style={{ width: '125px', height: '125px', fill: 'lightblue' }}/> 
            </h1>
            <span className="sub-header">   
                a minimalistic typing test website for coders
            </span>
    </div>
  );
};

export default Logo;
