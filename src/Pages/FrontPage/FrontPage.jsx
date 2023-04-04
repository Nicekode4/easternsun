import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
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
import SummaryButton from '../../Components/SummaryButton/SummaryButton'
import axios from 'axios'
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
  const { id } = useParams()
  const url = "https://admin.opendata.dk/api/3/action/datastore_search?resource_id=251528ca-8ec9-4b70-9960-83c4d0c4e7b6"
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(url).then((response) => {
      setPost(response.data.result.records);
    });
  }, [id]);

//console.log(post);

  return (
    <FrontPageStyle>
      <img src={logo} alt="logo" />
      <div className='revenueDiv'>
        <div>
          <h3>Dagens production</h3>
          <h2>4563 Wh</h2>
        </div>
        <div>
          <Bar options={options} data={data} />;
          
        </div>
        
      </div>
      <SummaryButton 
      SolarId={id}
      Index={post?.indexOf(post?.find(c => c.sid == id))}
      />
      <div className='panelArea'>
      {solarData.map(function(item, index){
        if (item.sid == id) {
          return (
            <NavLink to={`/${item.sid}`} >
            <div className='DaActive'>
          <img src={solar} alt="" />
          <h2>{solarData[index].location}</h2>
          <p>{solarData[index].Antal_solceller} paneler</p>
        </div>
        </NavLink>
          )
        }else{
          return (
            <NavLink to={`/${item.sid}`}>
            <div className='NotActive'>
          <img src={solar} alt="" />
          <h2>{solarData[index].location}</h2>
          <p>{solarData[index].Antal_solceller} paneler</p>
        </div>
        </NavLink>
          )
        }
          })}
      </div>
    </FrontPageStyle>
  )
}

export default FrontPage