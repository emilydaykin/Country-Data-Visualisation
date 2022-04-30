import React from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip
  // Legend
);

const BubbleChart = () => {
  const options = {
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        beginAtZero: true
      }
    }
  };

  const data = {
    datasets: [
      {
        // label: 'Red dataset',
        data: Array.from({ length: 1 }, () => ({
          x: 50,
          y: 65,
          r: 15
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        // label: 'Blue dataset',
        data: Array.from({ length: 1 }, () => ({
          x: 32,
          y: 71,
          r: 6
        })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };

  return <Bubble options={options} data={data} />;
};

export default BubbleChart;
