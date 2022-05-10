import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GroupedBarChart = ({ countryData }) => {
  const setFont = (fontSize) => {
    return { size: fontSize, family: 'Poppins' };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        text: 'School Enrollment (% gross)',
        font: setFont(20)
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` ${context.dataset.label}: ${context.raw}%`;
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
    responsive: true,
    labels: ['Primary', 'Secondary', ['Higher', 'Education']],
    datasets: [
      {
        label: 'Female',
        data: [
          countryData.primary_school_enrollment_female,
          countryData.secondary_school_enrollment_female,
          countryData.post_secondary_enrollment_female
        ],
        backgroundColor: '#70b266',
        hoverBackgroundColor: '#b8b8b8'
      },
      {
        label: 'Male',
        data: [
          countryData.primary_school_enrollment_male,
          countryData.secondary_school_enrollment_male,
          countryData.post_secondary_enrollment_male
        ],
        backgroundColor: '#c0e9ba',
        hoverBackgroundColor: '#b8b8b8'
      }
    ]
  };
  return <Bar className='chartJS chartJS__bar' options={options} data={data} />;
};

export default GroupedBarChart;
