import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

const DoughnutChart = () => {
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 15,
            family: 'Poppins'
          }
        }
      },
      title: {
        display: true,
        text: 'Employment',
        font: {
          size: 20,
          family: 'Poppins'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            console.log('context', context);
            return ` ${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 5
      }
    }
  };

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ['Agriculture', 'Industry', 'Services'],
    datasets: [
      {
        data: [2.6, 18.9, 78.5],
        backgroundColor: ['#70b266', '#92d088', '#c0e9ba'],
        hoverBackgroundColor: '#b8b8b8'
      }
    ]
  };
  return <Doughnut className='bubble-chart' options={options} data={data} />;
};

export default DoughnutChart;
