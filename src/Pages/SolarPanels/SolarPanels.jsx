import React, { useEffect, useState } from 'react'
// import solarData from "../../solcelle.json"
import solar from '../../Images/solar-panel.png'
import { NavLink } from 'react-router-dom'
import { SolarPanelsStyle } from './SolarPanels.style'

function SolarPanels() {
  const [solarData, setData] = useState([]);

  useEffect(() => {
    fetch("https://xdmevphexshiintoioqy.supabase.co/rest/v1/solar?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkbWV2cGhleHNoaWludG9pb3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI0MjAzMTMsImV4cCI6MTk5Nzk5NjMxM30.a5P34_o63lHm9HxrPo-0TCYs8udwQBmIBKrKopxKfOQ")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <SolarPanelsStyle>
    <div className='panelArea'>
      {solarData.map(function(item, index){
             if (item.sid == localStorage.getItem('MyId')) {
              return (
                <NavLink className="active" to={`/summary/${item.sid}`} key={index}>
                <div>
              <img src={solar} alt="" />
              <h2>{solarData[index].name}</h2>
              <p>{solarData[index].number_of_panels} paneler</p>
            </div>
            </NavLink>
              )
             }else{
              return (
                <NavLink to={`/summary/${item.sid}`} key={index}>
                <div>
              <img src={solar} alt="" />
              <h2>{solarData[index].name}</h2>
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