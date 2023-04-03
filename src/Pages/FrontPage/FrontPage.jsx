import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../../Components/NavBar/Navbar'
import { FrontPageStyle } from './FrontPage.style'

function FrontPage() {
  return (
    <FrontPageStyle>
      <h1>Front page</h1>
      <li><NavLink to={"/summary"}>Summary</NavLink></li>
    </FrontPageStyle>
  )
}

export default FrontPage