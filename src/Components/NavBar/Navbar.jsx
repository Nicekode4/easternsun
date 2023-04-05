import React from 'react'
import logo from '../../Images/logo-no-background.png'
import list from '../../Images/list.png'
import compass from '../../Images/compass.png'
import calc from '../../Images/calc.png'
import { NavLink, useParams } from 'react-router-dom'
import { NavBarStyle } from './NavBar.style'
import solarData from "../../solcelle.json"

function Navbar() {
  const { id } = useParams()
  return (
    <NavBarStyle>
    <div><NavLink to={id ? `/${id}` : `/${solarData[0].sid}`}>Home</NavLink></div>
    <NavLink to={id ? `/summary/${id}` : `/summary/${solarData[0].sid}`}><img src={list} alt="logo" /></NavLink>
    <NavLink to="/map"><img src={compass} alt="logo" /></NavLink>
    <NavLink to="/"><img src={calc} alt="logo" /></NavLink>
    </NavBarStyle>
    
  )
}

export default Navbar