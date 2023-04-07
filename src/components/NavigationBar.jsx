/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import {Navbar} from "react-bootstrap";




export const NavigationBar = ({handleLocaleChange}) => {

  

  return (
   
    <Navbar variant="dark" className="navbarStyle navbarColor">
    {/* <a className="navbar-brand logo" href="/">
        ValGenesis
    </a> */}
    <img src="https://www.valgenesis.com/hubfs/Logo/ValGenesis-Logo-White_with-tm.svg" alt="ValGenesis" width="217" height="25"></img>
    <div>
    <select className="selectButton" onChange={handleLocaleChange}>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  </div>

</Navbar>




  );
};
export default NavigationBar;
