import React, { useEffect, useState } from 'react'
// import solarData from "../../solcelle.json"
import solar from '../../Images/solar-panel.png'
import { NavLink } from 'react-router-dom'
import { SolarPanelsStyle } from './SolarPanels.style'
import axios from 'axios';

function SolarPanels() {
  const [solarData, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response1 = await axios.get(`https://xdmevphexshiintoioqy.supabase.co/rest/v1/solar${window.env.API_URL}?apikey=${window.env.API_KEY}`);
        setData(response1.data);
      } catch (error) {
        console.log(error);
      }
    }
    
    getData();
    
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