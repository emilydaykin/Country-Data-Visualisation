import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GreenBarChart = ({
  asiaCountries,
  africaCountries,
  europeCountries,
  northAmericaCountries,
  southAmericaCountries,
  oceaniaCountries
}) => {
  // const [sampleSize, setSampleSize] = useState(0);

  // let sampleSize = 0;
  const getTotal = (arr, metric) =>
    arr.reduce((a, b) => {
      // console.log('a', a.name);
      // console.log('b', b.name);
      // let prev = !a[metric] ? 0 : a[metric];
      // console.log('prev', prev);
      let next = !b[metric] ? 0 : b[metric];
      // if (next > 0) {
      //   // setSampleSize(sampleSize + 1);
      //   sampleSize++;
      // }
      // console.log(`next (${b.name})`, next);
      return a + next;
    }, 0);

  // console.log('total CO2 in oceania:', getTotal(oceaniaCountries, 'co2_emissions'));
  // console.log('threatened species in oceania:', getTotal(oceaniaCountries, 'threatened_species'));
  // console.log('sampleSize (with data)', sampleSize);
  // console.log('total', oceaniaCountries.length);
  // console.log('oceaniaCountries', oceaniaCountries);

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
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
        text: 'Total Carbon Dioxide Emissions and Threatened Species across Continents',
        font: {
          size: 20,
          family: 'Poppins'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            console.log('context', context);
            return ` ${context.dataset.label.split(' ').slice(0, 2).join(' ')}: ${Number(
              context.raw.toFixed(0)
            ).toLocaleString()}`;
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
    },
    layout: {
      padding: 20
    }
  };

  const data = {
    responsive: true,
    labels: [
      ['Asia', '(n_CO2 = 41/47)', '(n_TS = 47/47)', ''],
      ['Africa', '(n_CO2 = 28/52)', '(n_TS = 52/52)', ''],
      ['Europe', '(n_CO2 = 39/44)', '(n_TS = 44/44)', ''],
      ['North America', '(n_CO2 = 14/23)', '(n_TS = 23/23)', ''],
      ['South America', '(n_CO2 = 11/12)', '(n_TS = 12/12)', ''],
      ['Oceania', '(n_CO2 = 2/14)', '(n_TS = 14/14)', '']
    ],
    datasets: [
      {
        label: 'Co2 Emissions (metric tonnes)',
        data: [
          getTotal(asiaCountries, 'co2_emissions'),
          getTotal(africaCountries, 'co2_emissions'),
          getTotal(europeCountries, 'co2_emissions'),
          getTotal(northAmericaCountries, 'co2_emissions'),
          getTotal(southAmericaCountries, 'co2_emissions'),
          getTotal(oceaniaCountries, 'co2_emissions')
        ],
        backgroundColor: 'rgba(128, 0, 128, 0.3)',
        borderColor: 'rgba(128, 0, 128, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(128, 0, 128, 0.7)'
      },
      {
        label: 'Threatened Species (number)',
        data: [
          getTotal(asiaCountries, 'threatened_species'),
          getTotal(africaCountries, 'threatened_species'),
          getTotal(europeCountries, 'threatened_species'),
          getTotal(northAmericaCountries, 'threatened_species'),
          getTotal(southAmericaCountries, 'threatened_species'),
          getTotal(oceaniaCountries, 'threatened_species')
        ],
        backgroundColor: 'rgba(6, 162, 219, 0.3)',
        borderColor: 'rgba(6, 162, 219, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(6, 162, 219, 0.7)'
      }
    ]
  };
  return <Bar className='chartJS chartJS__all-countries' options={options} data={data} />;
};

export default GreenBarChart;
