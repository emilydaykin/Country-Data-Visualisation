import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({
  asiaCountries,
  africaCountries,
  europeCountries,
  northAmericaCountries,
  southAmericaCountries,
  oceaniaCountries
}) => {
  const asiaData = asiaCountries.filter((country) => country.forested_area);
  const africaData = africaCountries.filter((country) => country.forested_area);
  const europeData = europeCountries.filter((country) => country.forested_area);
  const northAmericaData = northAmericaCountries.filter((country) => country.forested_area);
  const southAmericaData = southAmericaCountries.filter((country) => country.forested_area);
  const oceaniaData = oceaniaCountries.filter((country) => country.forested_area);

  const getAverage = (arr, metric) =>
    arr.reduce((a, b) => {
      let next = !b[metric] ? 0 : b[metric];
      return a + next;
    }, 0) / arr.length;

  const getMax = (arr, metric) => {
    const maxForestedArea = Math.max.apply(
      Math,
      Object.values(arr).map((country) => {
        return country[metric];
      })
    );
    const maxCountry = arr.find((country) => country.forested_area === maxForestedArea);
    return [maxCountry.name, maxForestedArea];
  };

  const getMin = (arr, metric) => {
    const minForestedArea = Math.min.apply(
      Math,
      Object.values(arr).map((country) => {
        return country[metric];
      })
    );
    const minCountry = arr.find((country) => country.forested_area === minForestedArea);
    return [minCountry.name, minForestedArea];
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 15,
            family: 'Poppins'
          }
        }
      },
      title: {
        display: true,
        text: 'Forested Area across Continents',
        font: {
          size: 20,
          family: 'Poppins'
        }
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            return `${context[0].label[0]}`;
          },
          label: (context) => {
            if (context.dataset.label.toLowerCase().includes('average')) {
              return ` ${context.dataset.label.split(' (')[0]}: ${context.raw.toFixed(1)}%`;
            } else {
              return [
                ` ${context.dataset.label.split(' (')[0]}: ${context.raw}%`,
                ` (${context.dataset.dataLabels[context.dataIndex]})`
              ];
            }
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
    scale: {
      ticks: {
        font: {
          size: 15,
          family: 'Poppins'
        }
      }
    },
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 15,
            family: 'Poppins'
          }
        }
      }
    },
    layout: {
      padding: 10
    }
  };

  const data = {
    responsive: true,
    labels: [
      ['Asia', '(n=45/47)'],
      ['Africa', '(n=50/52)'],
      ['Europe', '(n=41/44)'],
      ['North America', '(n=23/23)'],
      ['South America', '(n=12/12)'],
      ['Oceania', '(n=13/14)']
    ],
    datasets: [
      {
        label: 'Maximum',
        data: [
          getMax(asiaData, 'forested_area')[1],
          getMax(africaData, 'forested_area')[1],
          getMax(europeData, 'forested_area')[1],
          getMax(northAmericaData, 'forested_area')[1],
          getMax(southAmericaData, 'forested_area')[1],
          getMax(oceaniaData, 'forested_area')[1]
        ],
        dataLabels: [
          getMax(asiaData, 'forested_area')[0],
          getMax(africaData, 'forested_area')[0],
          getMax(europeData, 'forested_area')[0],
          getMax(northAmericaData, 'forested_area')[0],
          getMax(southAmericaData, 'forested_area')[0],
          getMax(oceaniaData, 'forested_area')[0]
        ],
        backgroundColor: 'rgba(38, 196, 17, 0.3)',
        borderColor: 'rgb(38, 196, 17)',
        pointBackgroundColor: 'rgb(38, 196, 17)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(38, 196, 17)',
        pointHoverBorderWidth: 3
      },
      {
        label: 'Average',
        data: [
          getAverage(asiaData, 'forested_area'),
          getAverage(africaData, 'forested_area'),
          getAverage(europeData, 'forested_area'),
          getAverage(northAmericaData, 'forested_area'),
          getAverage(southAmericaData, 'forested_area'),
          getAverage(oceaniaData, 'forested_area')
        ],
        backgroundColor: 'rgba(6, 162, 219, 0.4)',
        borderColor: 'rgb(6, 162, 219)',
        pointBackgroundColor: 'rgb(6, 162, 219)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(radar 6, 162, 219)',
        pointHoverBorderWidth: 3
      },
      {
        label: 'Minimum',
        data: [
          getMin(asiaData, 'forested_area')[1],
          getMin(africaData, 'forested_area')[1],
          getMin(europeData, 'forested_area')[1],
          getMin(northAmericaData, 'forested_area')[1],
          getMin(southAmericaData, 'forested_area')[1],
          getMin(oceaniaData, 'forested_area')[1]
        ],
        dataLabels: [
          getMin(asiaData, 'forested_area')[0],
          getMin(africaData, 'forested_area')[0],
          getMin(europeData, 'forested_area')[0],
          getMin(northAmericaData, 'forested_area')[0],
          getMin(southAmericaData, 'forested_area')[0],
          getMin(oceaniaData, 'forested_area')[0]
        ],
        backgroundColor: 'rgba(255, 0, 217, 0.5)',
        borderColor: 'rgb(255, 0, 217)',
        pointBackgroundColor: 'rgb(255, 0, 217)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 0, 217)',
        pointHoverBorderWidth: 3
      }
    ]
  };
  return <Radar className='chartJS chartJS__radar' options={options} data={data} />;
};

export default RadarChart;
