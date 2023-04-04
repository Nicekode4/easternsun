import axios from 'axios'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Capacity from '../../Components/Capacity/Capacity'
import CO2reduction from '../../Components/CO2reduction/CO2reduction'
import PowerPeak from '../../Components/PowerPeak/PowerPeak'
import Production from '../../Components/Production/Production'
import TotalEnergy from '../../Components/TotalEnergy/TotalEnergy'
import TotalYeld from '../../Components/TotalYeld/TotalYeld'
import solarData from "../../sun.json"
import { SummaryStyle } from './Summary.style'
let eff = 0.20 // 20%
let cloudcover = 12 / 100 // 46%
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
  let foundApi = []
  let foundLocal = []
  const { id } = useParams()
  const url = "https://admin.opendata.dk/api/3/action/datastore_search?resource_id=251528ca-8ec9-4b70-9960-83c4d0c4e7b6"
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      axios.get(url).then((response) => {
        setPost(response.data.result.records);
        
      });
    }, 0);
  }, [id]);
  console.log(typeof id);
   foundApi = post.find(element => element.sid === 16015)
   foundLocal = solarData.find(element => element.sid = id)
  console.log(post);
console.log(foundApi);
  

  if (post) {
    return (
      <SummaryStyle>
        <header>
        <p>☁️ {(cloudcover * 100).toFixed(0)}%</p>
        <p>☀️ {hoursOfSun.toFixed(1)} T</p>
        </header>
        
        <Production 
        Wh={!post ? foundApi.current : 0}
        />
  
        
        <div className='cardArea'>
        <Capacity 
        kapacitet={solarData[5].kapasitet_pr_panel_i_Wh
        }
        />
        <TotalEnergy />
        <CO2reduction 
        co2={calculateCO2Reduction(energyProduction, carbonIntensity).toFixed(1)}
        />
        <PowerPeak 
        
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