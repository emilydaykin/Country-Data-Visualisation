import React, { useState, useEffect } from 'react';
import { Chart, LinearScale, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Bubble } from 'react-chartjs-2';

Chart.register(LinearScale, PointElement, Tooltip, Legend, Title);

const BubbleChart = ({
  firstQuantile,
  secondQuantile,
  thirdQuantile,
  fourthQuantile,
  fifthQuantile
}) => {
  const scaledRadius = 2;
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Countries by Co2 emissions, threatened species and forested area',
        font: 25
      },
      legend: {
        display: true,
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            console.log('context', context);
            return context.raw.country;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Threatened Species'
        }
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Co2 emissions'
        }
      }
    }
  };
  const data = {
    labels: ['Price in USD', 'hmmmm'],
    datasets: [
      {
        label: 'First (Top) Quantile',
        data: firstQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            // r: datapoint.forested_area / scaledRadius,
            // r: datapoint.gdp_per_capita / 2000,
            r: datapoint.gdp / 1000,
            // r: (datapoint.tourists / datapoint.population) * 50,
            country: `${datapoint.name} (${datapoint.co2_emissions}, ${datapoint.threatened_species})`
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
            // r: datapoint.forested_area / scaledRadius,
            // r: datapoint.gdp_per_capita / 2000,
            r: datapoint.gdp / 100000,
            // r: (datapoint.tourists / datapoint.population) * 10,
            country: `${datapoint.name} (${datapoint.co2_emissions}, ${datapoint.threatened_species})`
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
            // r: datapoint.forested_area / scaledRadius,
            r: datapoint.gdp_per_capita / 2000,
            country: `${datapoint.name} (${datapoint.co2_emissions}, ${datapoint.threatened_species})`
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
            // r: datapoint.forested_area / scaledRadius,
            r: datapoint.gdp_per_capita / 2000,
            country: `${datapoint.name} (${datapoint.co2_emissions}, ${datapoint.threatened_species})`
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
            // r: datapoint.forested_area / scaledRadius,
            r: datapoint.gdp_per_capita / 2000,
            country: `${datapoint.name} (${datapoint.co2_emissions}, ${datapoint.threatened_species})`
          };
        }),
        backgroundColor: 'rgba(246, 162, 6, 0.5)'
      }
    ]
  };

  console.log('data', data);

  return <Bubble className='chartJS' options={options} data={data} />;
};

export default BubbleChart;
