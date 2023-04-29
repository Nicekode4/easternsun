import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Navbar from '../../Components/NavBar/Navbar'
import { FrontPageStyle } from './FrontPage.style'
import logo from '../../Images/logo-no-background.png'
import solar from '../../Images/solar-panel.png'
// import solarData from "../../solcelle.json"
import solarpanel2 from '../../Images/SolarPanel1.png'
import solarpanel1 from '../../Images/solar-system.jpg'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import SummaryButton from '../../Components/SummaryButton/SummaryButton'
import axios from 'axios'
import Capacity from '../../Components/Capacity/Capacity'
import TotalEnergy from '../../Components/TotalEnergy/TotalEnergy'
const numbers = [22,4,66,8,99,1,8,25,46,63,83,39,3,83]
   
    
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  // Calculate energy produced in kilowatt-hours
  let energyProduced = (capacity * numberOfPanels) * efficiency / 100;

  return energyProduced
}

function FrontPage() {
  const [solarData, setData] = useState([]);
const [post, setPost] = React.useState(null);


  console.log(localStorage.getItem('MyId'));
 const { id } = useParams()  
  if (!id == localStorage.getItem('MyId')) {
     window.location.reload() 
    
  }
  if (!id) {
      window.location.replace(localStorage.getItem('MyId'));
   } 
    if (id && localStorage.getItem('MyId') == undefined) {
     window.location.replace(solarData[0].sid);
   } 
   let solarPanelData = solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))]
   useEffect(() => {
    const getData = async () => {
      try {
        const response1 = await axios.get(`https://xdmevphexshiintoioqy.supabase.co/rest/v1/solar?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkbWV2cGhleHNoaWludG9pb3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI0MjAzMTMsImV4cCI6MTk5Nzk5NjMxM30.a5P34_o63lHm9HxrPo-0TCYs8udwQBmIBKrKopxKfOQ`);
        setData(response1.data);
        solarPanelData = response1.data[response1.data?.indexOf(response1.data?.find(c => c.sid == id))]
        const response2 = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${solarPanelData?.Latitude}&longitude=${solarPanelData?.Longtitude}&hourly=temperature_2m,cloudcover&daily=sunrise,sunset&windspeed_unit=ms&timezone=Europe%2FBerlin`);
        
        setPost(response2.data)
      } catch (error) {
        console.log(error);
      }
    }
    
    getData();
    
  }, [id ]);
  let g1 = solarPanelData?.capacity_pr_panel_in_W * solarPanelData?.number_of_panels * post?.hourly.cloudcover[new Date().getHours()] / 100
let g2 = solarPanelData?.capacity_pr_panel_in_W * solarPanelData?.number_of_panels
let g3 = g2 - g1
  console.log(new Date(22.00).getHours());
    // Set the two times to subtract
var time1 = new Date(post?.daily.sunrise[0]);
var time2 = new Date(post?.daily.sunset[0]);

// Subtract one hour from time1
time1.setHours(time1.getHours() - 1);

// Calculate the difference in minutes between the two times
var diffInMinutes = Math.abs(time2 - time1) / (1000 * 60 * 60).toFixed(0);

console.log(solarPanelData);

let ChartProduction = []
let ProductionTotal = 0
let clouds = []
let labels = []
for (let index = new Date(post?.daily.sunrise[0]).getHours(); index < new Date(post?.daily.sunset[0]).getHours() + 1; index++) {
  const element = 1 - (post?.hourly.cloudcover[index] / 100);
  clouds.push(element * 100)
  ProductionTotal = ProductionTotal + calculateSolarEnergyProduced(solarPanelData?.capacity_pr_panel_in_W,solarPanelData?.number_of_panels, solarPanelData.effecincy) * element + 0.10
  ChartProduction.push((calculateSolarEnergyProduced(solarPanelData?.capacity_pr_panel_in_W,solarPanelData?.number_of_panels, solarPanelData.effecincy) * element + 0.10).toFixed(1))
  labels.push(index)
}
  
//console.log(post);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'top'
    },
    title: {
      display: false,
      text: '',
    },
  },
};

const data = {
  labels,
  ChartProduction,
  datasets: [
    {
      label: 'Produktion i kWh',
      data: ChartProduction,
      backgroundColor: '#183948',
    },

  ],
};
if (solarData) {
   return (
    
    <FrontPageStyle>
      <img src={solarpanel1} alt="Solar panel" className='topImg'/>
                      <header>
                        <h2>{solarPanelData?.name}</h2>
              <div>
                        <p>☁️ {post?.hourly.cloudcover[new Date().getHours()]}%</p>
        <p>☀️ {hoursOfDay(time2, time1).toFixed(1)} T</p>
              </div>

        </header>
      <div className='revenueDiv'>
        <div>
          <h3>Dagens production</h3>
          <h2>{ProductionTotal.toFixed(1)} kWh</h2>
        </div>
        <div>
          <Bar options={options} data={data} />;
          
        </div>
        
      </div>
      <div className='cardArea'>
      <Capacity 
      kapacitet={solarPanelData?.capacity_pr_panel_in_W}
      />
      <TotalEnergy 
      total={solarPanelData?.number_of_panels}
      />
      <NavLink to={`/summary/${id}`}>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M350 177.5c3.8-8.8 2-19-4.6-26l-136-144C204.9 2.7 198.6 0 192 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S46.5 192 56 192h88v192c0 17.7-14.3 32-32 32H32c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h80c70.7 0 128-57.3 128-128V192h88c9.6 0 18.2-5.7 22-14.5z" />
  </svg></NavLink>
      </div>
    </FrontPageStyle>
  )
}else{
  return (
    <div>Loading...</div>
  )
}
 
}

export default FrontPage