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
  
  return co2Reduction * 1000;
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
  return Math.abs(time2 - time1) / (1000 * 60 * 60);
}

function calculateSolarEnergyProduced(capacity, numberOfPanels, efficiency) {
  // Convert capacity from watts to kilowatts
  capacity = capacity / 1000;
console.log(capacity * numberOfPanels);
  // Calculate energy produced in kilowatt-hours
  let energyProduced = (capacity * numberOfPanels) * efficiency / 100;
console.log(energyProduced);
  return energyProduced
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


  let ChartProduction = []
  let ProductionTotal = 0
  let clouds = []
  let labels = []
  for (let index = new Date(post?.daily.sunrise[0]).getHours() >= 23 ? 0 : new Date(post?.daily.sunrise[0]).getHours(); index < new Date(post?.daily.sunset[0]).getHours() + 1; index++) {
    const element = 1 - (post?.hourly.cloudcover[index] / 100);
    clouds.push(Math.abs(((element * 100) - 100))) 
    ProductionTotal = ProductionTotal + calculateSolarEnergyProduced(solarPanelData.capacity_pr_panel_in_W, solarPanelData.number_of_panels ,solarPanelData.effecincy) * (element + 0.10)
    
    ChartProduction.push((calculateSolarEnergyProduced(solarPanelData.capacity_pr_panel_in_W, solarPanelData.number_of_panels ,solarPanelData.effecincy) * (element + 0.10)).toFixed(1))
    labels.push(index)
    console.log("rn value", calculateSolarEnergyProduced(solarPanelData.capacity_pr_panel_in_W, solarPanelData.number_of_panels,solarPanelData.effecincy) * (element + 0.10));
  }
  console.log(ChartProduction);
  if (post) {
    return (
      <SummaryStyle>
        <NavLink to={`/${localStorage.getItem('MyId')}`}><img className="backBtn" src={back} alt="back" /></NavLink>

        <Production 
        Wh={new Date().getHours() < new Date(post?.daily.sunset[0]).getHours() && new Date().getHours() > new Date(post?.daily.sunrise[0]).getHours() ? (calculateSolarEnergyProduced(solarPanelData.capacity_pr_panel_in_W,solarPanelData.number_of_panels ,solarPanelData.effecincy) * (1 - (post?.hourly.cloudcover[new Date().getHours()] / 100))) : 0}
        
        />
        <div className='cardAreaTop'>
        <CO2reduction 
        co2={calculateCO2Reduction(ProductionTotal, 0.5).toFixed(1)}
        />
        <PowerPeak 
        max={Math.max.apply(null, ChartProduction)}
        />  
        </div>        


        <div className='spacer'></div>
        
        <LineChart 
        production={ChartProduction}
        clouds={clouds}
        labels={labels}
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