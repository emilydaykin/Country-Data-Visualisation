import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

const DoughnutChart = ({ countryData }) => {
  const setFont = (fontSize) => {
    return { size: fontSize, family: 'Poppins' };
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: setFont(15)
        }
      },
      title: {
        display: true,
        text: 'Employment',
        font: setFont(20)
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` ${context.label}: ${context.raw}%`;
          }
        },
        bodyFont: setFont(15)
      }
    },
    elements: {
      arc: {
        borderWidth: 5
      }
    }
  };

  const data = {
    responsive: true,
    labels: ['Agriculture', 'Industry', 'Services'],
    datasets: [
      {
        data: [
          countryData.employment_agriculture,
          countryData.employment_industry,
          countryData.employment_services
        ],
        backgroundColor: ['#70b266', '#92d088', '#c0e9ba'],
        hoverBackgroundColor: '#b8b8b8'
      }
    ]
  };
  return <Doughnut className='chartJS chartJS__pie' options={options} data={data} />;
};

export default DoughnutChart;
