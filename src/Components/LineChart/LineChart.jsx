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



export function LineChart(probs) {
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
      
      const labels = probs.labels
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Production',
            data: probs.production,
            borderColor: '#a0e15089',
            backgroundColor: '#A0E150',
          },
        ],
      };
  return (
  <LineChartStyle><Line options={options} data={data} /></LineChartStyle>
  );
}