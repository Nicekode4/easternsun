import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LineChartStyle } from './LineChart.style';
import { useParams } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export function LineChart(props) {
  const { id } = useParams()

  console.log(id);
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: '',
          },
        },
      };
      
      const labels = props.labels
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Production i kW',
            data: props.production,
            borderColor: '#a0e15089',
            backgroundColor: '#A0E150',
          },
          {
            label: 'Cloudcover i %',
            data: props.clouds,
            borderColor: '#509be188',
            backgroundColor: '#3786ee',
          },
        ],
      };
  return (
  <LineChartStyle><Line options={options} data={data} /></LineChartStyle>
  );
}