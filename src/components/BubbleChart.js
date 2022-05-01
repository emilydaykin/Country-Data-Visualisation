import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = ({
  firstQuantile,
  secondQuantile,
  thirdQuantile,
  fourthQuantile,
  fifthQuantile
}) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Co2 emissions'
      }
    },
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
        label: 'First (Top) Quantile',
        data: firstQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / 3,
            datalabels: datapoint.name
          };
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Second Quantile',
        data: secondQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / 3,
            datalabels: datapoint.name
          };
        }),
        backgroundColor: 'rgba(255, 255, 132, 0.5)'
      },
      {
        label: 'Third Quantile',
        data: thirdQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / 3,
            datalabels: datapoint.name
          };
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        label: 'Fourth Quantile',
        data: fourthQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / 3,
            datalabels: datapoint.name
          };
        }),
        backgroundColor: 'rgba(26, 127, 26, 0.5)'
      },
      {
        label: 'Fifth (bottom) Quantile',
        data: fifthQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / 3,
            datalabels: datapoint.name
          };
        }),
        backgroundColor: 'rgba(246, 162, 6, 0.5)'
      }
    ]
  };

  console.log('data', data);

  return <Bubble options={options} data={data} />;
};

export default BubbleChart;
