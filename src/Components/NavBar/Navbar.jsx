import React from 'react'
import logo from '../../Images/logo-no-background.png'
import list from '../../Images/list.png'
import compass from '../../Images/compass.png'
import calc from '../../Images/calc.png'
import { NavLink } from 'react-router-dom'
import { NavBarStyle } from './NavBar.style'

function Navbar() {
  return (
    <NavBarStyle>
    <div><NavLink to="/">Home</NavLink></div>
    <NavLink to="/summary"><img src={list} alt="logo" /></NavLink>
    <NavLink to="/1"><img src={compass} alt="logo" /></NavLink>
    <NavLink to="/2"><img src={calc} alt="logo" /></NavLink>
    </NavBarStyle>
    
  )
}

export default Navbar