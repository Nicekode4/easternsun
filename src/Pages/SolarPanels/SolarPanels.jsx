import React from 'react'
import solarData from "../../solcelle.json"
import solar from '../../Images/solar-panel.png'
import { NavLink } from 'react-router-dom'
import { SolarPanelsStyle } from './SolarPanels.style'

function SolarPanels() {
  
  return (
    <SolarPanelsStyle>
    <div className='panelArea'>
      {solarData.map(function(item, index){
             if (item.sid == localStorage.getItem('MyId')) {
              return (
                <NavLink className="active" to={`/summary/${item.sid}`} key={index}>
                <div>
              <img src={solar} alt="" />
              <h2>{solarData[index].address}</h2>
              <p>{solarData[index].number_of_panels} paneler</p>
            </div>
            </NavLink>
              )
             }else{
              return (
                <NavLink to={`/summary/${item.sid}`} key={index}>
                <div>
              <img src={solar} alt="" />
              <h2>{solarData[index].address}</h2>
              <p>{solarData[index].number_of_panels} paneler</p>
            </div>
            </NavLink>
              )
             }
          }
)}
      </div>
      </SolarPanelsStyle>
  )
}

export default SolarPanels