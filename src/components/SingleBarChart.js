import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SingleBarChart = ({ countryData }) => {
  const setFont = (fontSize) => {
    return { size: fontSize, family: 'Poppins' };
  };

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
          font: setFont(15)
        }
      },
      title: {
        display: true,
        text: 'Life Expectancy (years)',
        font: setFont(20)
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` ${context.raw}%`;
          }
        },
        titleFont: setFont(15),
        bodyFont: setFont(15)
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: setFont(15)
        }
      },
      x: {
        beginAtZero: true,
        ticks: {
          font: setFont(15)
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
