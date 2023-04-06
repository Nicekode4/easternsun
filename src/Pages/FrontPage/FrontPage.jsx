import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Navbar from '../../Components/NavBar/Navbar'
import { FrontPageStyle } from './FrontPage.style'
import logo from '../../Images/logo-no-background.png'
import solar from '../../Images/solar-panel.png'
import solarData from "../../solcelle.json"
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



function FrontPage() {
  console.log(localStorage.getItem('MyId'));
 const { id } = useParams()  
 if (id !== localStorage.getItem('MyId')) {
    window.location.reload() 
    
  }
  if (!id) {
     window.location.replace(localStorage.getItem('MyId'));
   } 
   if (id == undefined) {
    window.location.replace(solarData[0].sid);
  } 

  let solarPanelData = solarData[solarData?.indexOf(solarData?.find(c => c.sid == id))]
  const url = "https://admin.opendata.dk/api/3/action/datastore_search?resource_id=251528ca-8ec9-4b70-9960-83c4d0c4e7b6"
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    const getOpenWeather = async () => {
      const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${solarPanelData.Latitude}&longitude=${solarPanelData.Longtitude}&hourly=temperature_2m,cloudcover&daily=sunrise,sunset&windspeed_unit=ms&timezone=Europe%2FBerlin`)
  
      setPost(res.data)
      console.log("status", res.data);
      //cloudcover1 = weatherData.hourly.cloudcover[new Date().getHours()] / 100
    }
  getOpenWeather() 
  }, [id]);
  let g1 = solarPanelData.capacity_pr_panel_in_W * solarPanelData.number_of_panels * post?.hourly.cloudcover[new Date().getHours()] / 100
let g2 = solarPanelData.capacity_pr_panel_in_W * solarPanelData.number_of_panels
let g3 = g2 - g1
  console.log(new Date(22.00).getHours());
    // Set the two times to subtract
var time1 = new Date(post?.daily.sunrise[0]);
var time2 = new Date(post?.daily.sunset[0]);

// Subtract one hour from time1
time1.setHours(time1.getHours() - 1);

// Calculate the difference in minutes between the two times
var diffInMinutes = Math.abs(time2 - time1) / (1000 * 60 * 60).toFixed(0);
let NewCloudcover = post?.hourly.cloudcover[new Date().getHours()] / 100
console.log(new Date(post?.daily.sunset[0]));
let NewHoursOfSun = diffInMinutes - (NewCloudcover * diffInMinutes)
let todayMax = []
let labels = []
console.log("The difference in hours between the two times is: " + diffInMinutes);
    console.log(diffInMinutes - NewCloudcover * diffInMinutes);
    let todayProduction = 0
    for (let index = 0; index < new Date().getHours() + 1; index++) {
      const element = post?.hourly.cloudcover[index];
          todayProduction = todayProduction + !NewCloudcover == 0 ? g2 - element / 100 * solarPanelData.capacity_pr_panel_in_W * solarPanelData.number_of_panels : solarPanelData.capacity_pr_panel_in_W * solarPanelData.number_of_panels
    }

    for (let index = new Date().getHours() - 6; index < new Date().getHours() + 1; index++) {
      const element = post?.hourly.cloudcover[index];
      todayMax.push(!NewCloudcover == 0 ? g2 - element / 100 * solarPanelData.capacity_pr_panel_in_W * solarPanelData.number_of_panels : solarPanelData.capacity_pr_panel_in_W * solarPanelData.number_of_panels)
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
  todayMax,
  datasets: [
    {
      label: '',
      data: todayMax,
      backgroundColor: '#183948',
    },
  ],
};
  return (
    <FrontPageStyle>
      <img src={solarpanel1} alt="Solar panel" className='topImg'/>
      <div className='revenueDiv'>
        <div>
          <h3>Dagens production</h3>
          <h2>{todayProduction} Wh</h2>
        </div>
        <div>
          <Bar options={options} data={data} />;
          
        </div>
        
      </div>
      <div className='cardArea'>
      <Capacity />
      <TotalEnergy 
      total={0}
      />
      <NavLink to={`/summary/${id}`}>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M350 177.5c3.8-8.8 2-19-4.6-26l-136-144C204.9 2.7 198.6 0 192 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S46.5 192 56 192h88v192c0 17.7-14.3 32-32 32H32c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h80c70.7 0 128-57.3 128-128V192h88c9.6 0 18.2-5.7 22-14.5z" />
  </svg></NavLink>
      </div>
    </FrontPageStyle>
  )
}

export default FrontPage