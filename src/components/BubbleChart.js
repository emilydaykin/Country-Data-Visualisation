import React from 'react';
import { Chart, LinearScale, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Bubble } from 'react-chartjs-2';

Chart.register(LinearScale, PointElement, Tooltip, Legend, Title);

const BubbleChart = ({
  firstQuantile,
  secondQuantile,
  thirdQuantile,
  fourthQuantile,
  fifthQuantile,
  sixthQuantile
}) => {
  const scaledRadius = 1.4;

  const setFont = (fontSize) => {
    return { size: fontSize, family: 'Poppins' };
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: [
          'Countries by Co2 Emissions (x), Threatened Species (y)',
          'and Forested Area (radius)',
          ''
        ],
        font: setFont(20)
      },
      legend: {
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'GDP',
          font: setFont(20)
        },
        labels: {
          font: setFont(15)
        }
      },
      datalabels: {
        color: 'red',
        labels: {
          font: setFont(15)
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const allLabels = context.raw.dataLabels.split(',');
            return [
              ` ${allLabels[0].toUpperCase()}:`,
              `   ${Number(
                allLabels[allLabels.length - 3]
              ).toLocaleString()} metric tonnes of Carbon Dioxide Emissions`,
              `   ${Number(allLabels[allLabels.length - 2]).toLocaleString()} Threatened Species`,
              `   ${allLabels[allLabels.length - 1]}% Forested Area`
            ];
          }
        },
        bodyFont: setFont(15)
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Threatened Species (n)',
          font: setFont(15)
        },
        ticks: {
          font: setFont(15)
        }
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Co2 emissions (metric tonnes)',
          font: setFont(15)
        },
        ticks: {
          font: setFont(15)
        }
      }
    }
  };
  const data = {
    datasets: [
      {
        label: '>= US$ 10 trillion (n=2)',
        data: firstQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(128, 0, 128, 0.5)',
        borderColor: 'rgba(128, 0, 128)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(220, 220, 220, 0.5)',
        hoverBorderWidth: 3
      },
      {
        label: '>= US$ 1 trillion (n=14)',
        data: secondQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(159, 10, 200, 0.5)',
        borderColor: 'rgba(159, 10, 200)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(220, 220, 220, 0.5)',
        hoverBorderWidth: 3
      },
      {
        label: `>= US$ 100 billion (n=47)`,
        data: thirdQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(82, 11, 222, 0.5)',
        borderColor: 'rgba(82, 11, 222)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(220, 220, 220, 0.5)',
        hoverBorderWidth: 3
      },
      {
        label: '>= US$ 10 billion (n=76)',
        data: fourthQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(20, 7, 164, 0.5)',
        borderColor: 'rgba(20, 7, 164)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(220, 220, 220, 0.5)',
        hoverBorderWidth: 3
      },
      {
        label: '>= US$ 1 billion (n=40)',
        data: fifthQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(6, 88, 219, 0.5)',
        borderColor: 'rgba(6, 88, 219)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(220, 220, 220, 0.5)',
        hoverBorderWidth: 3
      },
      {
        label: ['< US$ 1 billion (n=12)', 'no data for CO2'],
        data: sixthQuantile.map((datapoint) => {
          return {
            x: 0, // all countries in this quantile have no data for C02
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(6, 162, 219, 0.5)',
        borderColor: 'rgba(6, 162, 219)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(220, 220, 220, 0.5)',
        hoverBorderWidth: 3
      }
    ]
  };

  return <Bubble className='chartJS chartJS__all-countries' options={options} data={data} />;
};

export default BubbleChart;
