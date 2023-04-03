import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../../Components/NavBar/Navbar'
import { FrontPageStyle } from './FrontPage.style'
import logo from '../../Images/logo-no-background.png'
import solarData from "../../sun.json"

function FrontPage() {
  return (
    <FrontPageStyle>
      <img src={logo} alt="logo" />
      <div className='revenueDiv'>
        <div>
          <h3>Dagens production</h3>
          <h2>4563 Wh</h2>
        </div>
      
      <img src={logo} alt="" />
      <img src={logo} alt="" />
      <img src={logo} alt="" />
      </div>
      <div className='panelArea'>
        <div>
          <h2>{solarData[5].location}</h2>
          <p>{solarData[5].Antal_solceller} paneler</p>
        </div>
        <div>
          <h2>{solarData[6].location}</h2>
          <p>{solarData[6].Antal_solceller} paneler</p>
        </div>
        <div>
          <h2>{solarData[7].location}</h2>
          <p>{solarData[7].Antal_solceller} paneler</p>
        </div>
        <div>
          <h2>{solarData[8].location}</h2>
          <p>{solarData[8].Antal_solceller} paneler</p>
        </div>
        <div>
          <h2>{solarData[9].location}</h2>
          <p>{solarData[9].Antal_solceller} paneler</p>
        </div>
        <div>
          <h2>{solarData[10].location}</h2>
          <p>{solarData[10].Antal_solceller} paneler</p>
        </div>
        <div>
          <h2>{solarData[1].location}</h2>
          <p>{solarData[1].Antal_solceller} paneler</p>
        </div>
      </div>
    </FrontPageStyle>
  )
}

export default FrontPage