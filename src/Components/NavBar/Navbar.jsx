import React from 'react'
import logo from '../../Images/logo-no-background.png'
import home from '../../Images/home.png'
import list from '../../Images/list.png'
import compass from '../../Images/compass.png'
import graph from '../../Images/graph.png'
import calc from '../../Images/calc.png'
import { NavLink, useParams } from 'react-router-dom'
import { NavBarStyle } from './NavBar.style'
import solarData from "../../solcelle.json"

function Navbar() {
  const { id } = useParams()
  
  return (
    <NavBarStyle>
    <NavLink to={id ? `/${id}` : `/${localStorage.getItem('MyId')}`}><img src={home} alt="logo" /></NavLink>
    <NavLink to="/select"><img src={list} alt="logo" /></NavLink>
    <NavLink to={id ? `/summary/${id}` : `/summary/${localStorage.getItem('MyId')}`}><img src={graph} alt="logo" /></NavLink>
    <NavLink to="/map"><img src={compass} alt="logo" /></NavLink>
    <NavLink to="/"><img src={calc} alt="logo" /></NavLink>
    </NavBarStyle>
    
  )
}

export default Navbar