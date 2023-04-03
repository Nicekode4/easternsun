import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../../Components/NavBar/Navbar'
import { FrontPageStyle } from './FrontPage.style'
import logo from '../../Images/logo-no-background.png'
import solar from '../../Images/solar-panel.png'
import solarData from "../../sun.json"
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
const numbers = [22,4,66,8,99,1,8,25,46,63,83,39,3,83]

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

const labels = [10,11,12,13,14,16];

export const data = {
  labels,
  datasets: [
    {
      label: '',
      data: numbers,
      backgroundColor: 'rgba(99, 109, 255, 0.5)',
    },
  ],
};

function FrontPage() {

  return (
    <FrontPageStyle>
      <img src={logo} alt="logo" />
      <div className='revenueDiv'>
        <div>
          <h3>Dagens production</h3>
          <h2>4563 Wh</h2>
        </div>
        <Bar options={options} data={data} />;
      </div>
      <div className='panelArea'>
        <div>
          <img src={solar} alt="" />
          <h2>{solarData[5].location}</h2>
          <p>{solarData[5].Antal_solceller} paneler</p>
        </div>
        <div className='DaActive'>
          <img src={solar} alt="" />
          <h2>{solarData[6].location}</h2>
          <p>{solarData[6].Antal_solceller} paneler</p>
        </div>
        <div >
          <img src={solar} alt="" />
          <h2>{solarData[7].location}</h2>
          <p>{solarData[7].Antal_solceller} paneler</p>
        </div>
        <div>
          <img src={solar} alt="" />
          <h2>{solarData[8].location}</h2>
          <p>{solarData[8].Antal_solceller} paneler</p>
        </div>
        <div>
          <img src={solar} alt="" />
          <h2>{solarData[9].location}</h2>
          <p>{solarData[9].Antal_solceller} paneler</p>
        </div>
        <div>
          <img src={solar} alt="" />
          <h2>{solarData[10].location}</h2>
          <p>{solarData[10].Antal_solceller} paneler</p>
        </div>
        <div>
          <img src={solar} alt="" />
          <h2>{solarData[1].location}</h2>
          <p>{solarData[1].Antal_solceller} paneler</p>
        </div>
      </div>
    </FrontPageStyle>
  )
}

export default FrontPage