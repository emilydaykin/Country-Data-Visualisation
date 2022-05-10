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
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Countries by Co2 Emissions, Threatened Species and Forested Area',
        font: {
          size: 20,
          family: 'Poppins'
        }
      },
      legend: {
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'GDP',
          font: {
            size: 20,
            family: 'Poppins'
          }
        },
        labels: {
          font: {
            size: 15,
            family: 'Poppins'
          }
        }
      },
      datalabels: {
        color: 'red',
        labels: {
          font: {
            size: 15,
            family: 'Poppins'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const allLabels = context.raw.dataLabels.split(',');
            return [
              ` ${allLabels[0].toUpperCase()}:`,
              `   ${Number(
                allLabels[1]
              ).toLocaleString()} metric tonnes of Carbon Dioxide Emissions`,
              `   ${Number(allLabels[2]).toLocaleString()} Threatened Species`,
              `   ${allLabels[3]}% Forested Area`
            ];
          }
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
        title: {
          display: true,
          text: 'Threatened Species (n)',
          font: {
            size: 15,
            family: 'Poppins'
          }
        },
        ticks: {
          font: {
            size: 15,
            family: 'Poppins'
          }
        }
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Co2 emissions (metric tonnes)',
          font: {
            size: 15,
            family: 'Poppins'
          }
        },
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
    datasets: [
      {
        label: '>= US$ 10 trillion',
        data: firstQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(128, 0, 128, 0.5)'
      },
      {
        label: '>= US$ 1 trillion',
        data: secondQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(159, 10, 200, 0.5)'
      },
      {
        label: `>= US$ 100 billion`,
        data: thirdQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(82, 11, 222, 0.5)'
      },
      {
        label: '>= US$ 10 billion',
        data: fourthQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(20, 7, 164, 0.5)'
      },
      {
        label: '>= US$ 1 billion',
        data: fifthQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(6, 88, 219, 0.5)'
      },
      {
        label: '< US$ 1 billion',
        data: sixthQuantile.map((datapoint) => {
          return {
            x: datapoint.co2_emissions,
            y: datapoint.threatened_species,
            r: datapoint.forested_area / scaledRadius,
            dataLabels: `${datapoint.name},${datapoint.co2_emissions},${datapoint.threatened_species},${datapoint.forested_area}`
          };
        }),
        backgroundColor: 'rgba(6, 162, 219, 0.5)'
      }
    ]
  };

  return <Bubble className='chartJS chartJS__all-countries' options={options} data={data} />;
};

export default BubbleChart;
