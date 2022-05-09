import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SingleBarChart = ({ countryData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    height: 200,
    plugins: {
      legend: {
        display: false,
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
        text: 'Life Expectancy (years)',
        font: {
          size: 20,
          family: 'Poppins'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            console.log('context', context);
            return ` ${context.raw}%`;
          }
        },
        titleFont: {
          size: 15,
          family: 'Poppins'
        },
        bodyFont: {
          size: 15,
          family: 'Poppins'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 15,
            family: 'Poppins'
          }
        }
      },
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 15,
            family: 'Poppins'
          }
        }
      }
    }
  };

  const data = {
    responsive: false,
    labels: ['Female', 'Male'],
    datasets: [
      {
        data: [countryData.life_expectancy_female, countryData.life_expectancy_male],
        backgroundColor: ['#70b266', '#c0e9ba'],
        hoverBackgroundColor: '#b8b8b8'
      }
    ]
  };
  return <Bar className='chartJS chartJS__single-bar' options={options} data={data} />;
};

export default SingleBarChart;
