import React from 'react'
import logo from '../../Images/logo-no-background.png'
import { NavLink } from 'react-router-dom'
import { NavBarStyle } from './NavBar.style'

function Navbar() {
  return (
    <NavBarStyle>
    <div><NavLink to="/">Home</NavLink></div>
    <NavLink to="/summary"><img src={logo} alt="logo" /></NavLink>
    <NavLink to="/summary"><img src={logo} alt="logo" /></NavLink>
    <NavLink to="/summary"><img src={logo} alt="logo" /></NavLink>
    </NavBarStyle>
    
  )
}

export default Navbar