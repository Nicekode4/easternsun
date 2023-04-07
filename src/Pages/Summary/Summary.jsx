import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Capacity from '../../Components/Capacity/Capacity'
import CO2reduction from '../../Components/CO2reduction/CO2reduction'
import { LineChart } from '../../Components/LineChart/LineChart'
import PowerPeak from '../../Components/PowerPeak/PowerPeak'
import Production from '../../Components/Production/Production'
import TotalEnergy from '../../Components/TotalEnergy/TotalEnergy'
import TotalYeld from '../../Components/TotalYeld/TotalYeld'
import solarData from "../../solcelle.json"
import back from "../../Images/arrow.png"
import { SummaryStyle } from './Summary.style'


//Calculates the reduction in CO2 the solar power replaces
function calculateCO2Reduction(energyProduction, carbonIntensity) {
  // Convert energy production to kilowatt-hours
  energyProduction = energyProduction / 1000;
  
  // Calculate CO2 reduction in kilograms
  let co2Reduction = energyProduction * carbonIntensity;
  
  return co2Reduction;
}

//Calculates how much sunlight reaches the panel
function calculateSolarIrradiance(latitude, timeOfDay, dayOfYear, panelTilt) {
  // Convert latitude to radians
  let latRadians = latitude * Math.PI / 180;
  
  // Calculate the solar declination angle in radians
  let solarDeclination = 23.45 * Math.PI / 180 * Math.sin(2 * Math.PI * (284 + dayOfYear) / 365);
  
  // Calculate the solar hour angle in radians
  let solarHourAngle = Math.PI / 12 * (timeOfDay - 12) + (Math.PI / 180 * 15) * (0.172 * Math.sin(0.9856 * (dayOfYear - 2) * Math.PI / 180 - 1.43));
  
  // Calculate the solar zenith angle in radians
  let solarZenithAngle = Math.acos(Math.sin(latRadians) * Math.sin(solarDeclination) + Math.cos(latRadians) * Math.cos(solarDeclination) * Math.cos(solarHourAngle));
  
  // Calculate the solar irradiance in W/m^2
  let solarIrradiance = 1361 * Math.cos(solarZenithAngle) * Math.cos(panelTilt * Math.PI / 180);
  
  // Return the solar irradiance
  return solarIrradiance;
}

//Calculates the direction the sun is shining
function calculateSunAzimuth(latitude) {
  let d = new Date();
  let h = (d.getHours() + d.getMinutes() / 60 - 12) * (Math.PI / 12);
  let delta = 23.45 * Math.sin((2 * Math.PI / 365) * (284 + d.getDate()));
  let phi = latitude * (Math.PI / 180);
  let numerator = Math.sin(h);
  let denominator = Math.cos(h) * Math.sin(phi) - Math.tan(delta) * Math.cos(phi);
  let theta = Math.atan2(numerator, denominator) * (180 / Math.PI);
  return parseInt((theta + 360)) % 360;
}

//Calculates the day of the year
function dayOfYear() {
  let now = new Date();
let start = new Date(now.getFullYear(), 0, 0);
let diff = now - start;
let oneDay = 1000 * 60 * 60 * 24;

return Math.floor(diff / oneDay);
}

//Calculates how many hours of light there is in a day
function hoursOfDay(sunset, sunrise) {
    // Set the two times to subtract
  let time1 = new Date(sunrise);
  let time2 = new Date(sunset);  
// Subtract one hour from time1
time1.setHours(time1.getHours() - 1);

// Calculate the difference in minutes between the two times
  return Math.abs(time2 - time1) / (1000 * 60 * 60).toFixed(0);
}

function Summary() {
  const { id } = useParams()
  if (id !== localStorage.getItem('MyId')) {
    window.location.reload() 
    
  }
  if (id !== localStorage.getItem('MyId')) {
    localStorage.setItem('MyId', id) 
  }
  
  let solarPanelData = solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))]
  const [post, setPost] = React.useState(null);
  let productionData = []
  let weatherData = []
  useEffect(() => {
  const getOpenWeather = async () => {
    const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${solarPanelData.Latitude}&longitude=${solarPanelData.Longtitude}&hourly=temperature_2m,cloudcover&daily=sunrise,sunset&windspeed_unit=ms&timezone=Europe%2FBerlin`)

    setPost(res.data)
    console.log("status", res.data);
    console.log(weatherData);
  }
getOpenWeather() 
  
  }, [id]);


let azimuth = calculateSunAzimuth(solarPanelData.Latitude);
console.log("The sun's angle is " + azimuth.toFixed(2) + " degrees.");
  if (post) {
    return (
      <SummaryStyle>
        <NavLink to={`/${localStorage.getItem('MyId')}`}><img className="backBtn" src={back} alt="back" /></NavLink>
                {/* <header>
        <p>☁️ {post?.hourly.cloudcover[new Date().getHours()]}%</p>
        <p>☀️ {NewHoursOfSun.toFixed(1)} T</p>
        </header> */}
        <Production 
        Wh= {0}
        
        />
        <div className='cardAreaTop'>
        <CO2reduction 
        co2={calculateCO2Reduction(1, 0.1).toFixed(1)}
        />
        <PowerPeak 
        max={Math.max.apply(null, [1000, 1]) / 1000}
        />  
        </div>        


        <div className='spacer'></div>
        
        <LineChart 
        production={[40,50,33,40,50]}
        labels={[1,2,3,4,5,6]}
        />
      
        {/* <div className='cardArea'>
        <Capacity 
        kapacitet={solarData ? solarPanelData.capacity_pr_panel_in_W : 1}
        />
        <TotalEnergy 
        total={todayProduction}
        />


        </div> */}
  
      </SummaryStyle>
    )
  }else{
    return (
      <div>Loading...</div>
    )
  }
  
}

export default Summary