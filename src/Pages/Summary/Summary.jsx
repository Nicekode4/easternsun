import axios from 'axios'
import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Capacity from '../../Components/Capacity/Capacity'
import CO2reduction from '../../Components/CO2reduction/CO2reduction'
import PowerPeak from '../../Components/PowerPeak/PowerPeak'
import Production from '../../Components/Production/Production'
import TotalEnergy from '../../Components/TotalEnergy/TotalEnergy'
import TotalYeld from '../../Components/TotalYeld/TotalYeld'
import solarData from "../../solcelle.json"
import { SummaryStyle } from './Summary.style'
let eff = 0.20 // 20%
let cloudcover = 0
let hoursOfDay = 13
let hoursOfSun = hoursOfDay - cloudcover * hoursOfDay
let powerRating = solarData[5].Antal_solceller * solarData[5].kapasitet_pr_panel_i_Wh //Watts

let energyProduction = calculateSolarEnergyProduced(powerRating, hoursOfSun, eff); // in watt-hours
let carbonIntensity = 0.5; // in kg CO2 per kWh

let co2Reduction = calculateCO2Reduction(energyProduction, carbonIntensity);

console.log(hoursOfSun);
function calculateSolarEnergyProduced(power, hoursOfSunlight, efficiency) {
  // Convert power from watts to kilowatts
  power = power / 1000;

  // Calculate energy produced in kilowatt-hours
  let energyProduced = power * hoursOfSunlight * efficiency;

  // Convert energy produced back to watt-hours
  energyProduced = energyProduced * 1000;

  return energyProduced;
}

function calculateCO2Reduction(energyProduction, carbonIntensity) {
  // Convert energy production to kilowatt-hours
  energyProduction = energyProduction / 1000;
  
  // Calculate CO2 reduction in kilograms
  let co2Reduction = energyProduction * carbonIntensity;
  
  return co2Reduction;
}
console.log("CO2 reduction: " + co2Reduction + " kg");
console.log(calculateSolarEnergyProduced(powerRating, hoursOfSun, eff),"Wh");

function Summary() {
  let cloudcover1 = 0
  let foundApi = []
  let foundLocal = []
  const { id } = useParams()
  const url = ""
  const [post, setPost] = React.useState(null);
  let productionData = []
  let weatherData = []
  React.useEffect(() => {
// //     const getProduction = async () => {
// //       const response = await axios.get(`https://admin.opendata.dk/api/3/action/datastore_search?resource_id=251528ca-8ec9-4b70-9960-83c4d0c4e7b6`)
// //       //console.log("Status", response.status);
// //       setPost(response.data.result.records)
// //       productionData = response.data
// // console.log(productionData.result.records);
     
// //   } 
  const getOpenWeather = async () => {
    const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=56.16&longitude=10.21&hourly=temperature_2m,cloudcover&daily=sunrise,sunset&windspeed_unit=ms&timezone=Europe%2FBerlin`)

    setPost(res.data)
    console.log("status", res.data);
    //cloudcover1 = weatherData.hourly.cloudcover[new Date().getHours()] / 100
    console.log(weatherData);
  }
getOpenWeather() 
  
  }, [id]);
  console.log(new Date(22.00).getHours());
    // Set the two times to subtract
var time1 = new Date(post?.daily.sunrise[0]);
var time2 = new Date(post?.daily.sunset[0]);

// Subtract one hour from time1
time1.setHours(time1.getHours() - 1);

// Calculate the difference in minutes between the two times
var diffInMinutes = Math.abs(time2 - time1) / (1000 * 60 * 60).toFixed(0);
let NewCloudcover = post?.hourly.cloudcover[new Date().getHours()] / 1000
let NewHoursOfSun = diffInMinutes - NewCloudcover * diffInMinutes
let todayMax = []
console.log("The difference in hours between the two times is: " + diffInMinutes);
    console.log(diffInMinutes - NewCloudcover * diffInMinutes);
    let todayProduction = 0
    for (let index = 0; index < new Date().getHours() + 1; index++) {
      const element = post?.hourly.cloudcover[index];
      todayMax.push(!NewCloudcover == 0 ? element / 1000 * solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].capacity_pr_panel_in_W * solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].number_of_panels : element / 1000 * solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].capacity_pr_panel_in_W * solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].number_of_panels)
      todayProduction = todayProduction + !NewCloudcover == 0 ? element / 1000 * solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].capacity_pr_panel_in_W * solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].number_of_panels : element / 1000 * solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].capacity_pr_panel_in_W * solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].number_of_panels
    }
    console.log(todayMax);
  // //  foundLocal = solarData.find(element => element.sid = id)
// // setTimeout(() => {
// //   console.log(post?.find(c => c.sid == id));
// //   foundApi = post[post?.indexOf(post?.find(c => c.sid == id))]
// // }, 1000);
// // // console.log(post[post.length].hourly.cloudcover[new Date().getHours()]);
// // //  console.log(post?.indexOf(post?.find(c => c.sid == id)));
// // console.log(post?.find(c => c.sid == id));
//lel
  if (post) {
    return (
      <SummaryStyle>
        <header>
        <p>☁️ {post?.hourly.cloudcover[new Date().getHours()]}%</p>
        <p>☀️ {NewHoursOfSun.toFixed(1)} T</p>
        </header>
        
        <Production 
        Wh={!NewCloudcover == 0 ? (NewCloudcover * (solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].capacity_pr_panel_in_W * solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].number_of_panels)).toFixed(0) : (solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].capacity_pr_panel_in_W * solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].number_of_panels).toFixed(0)}
        />
  
      
        <div className='cardArea'>
        <Capacity 
        kapacitet={solarData ? solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))].capacity_pr_panel_in_W : 1}
        />
        <TotalEnergy 
        total={todayProduction}
        />
        <CO2reduction 
        co2={calculateCO2Reduction(todayProduction, carbonIntensity).toFixed(1)}
        />
        <PowerPeak 
        max={Math.max.apply(null, todayMax)}
        />
        </div>
  
      </SummaryStyle>
    )
  }else{
    return (
      <div>Loading...</div>
    )
  }
  
}

export default Summary