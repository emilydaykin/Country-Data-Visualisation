import React, { useState, useEffect } from 'react';
import { countryAPI } from '../lib/api';
import { countriesToDisplay } from '../lib/countryList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Countries = () => {
  const [state, setState] = useState({});

  // select 30 random countries:
  // Shuffle array
  // const countriesShuffled = countriesToDisplay.sort(() => 0.5 - Math.random());
  // console.log('shuffle', countriesShuffled);
  // // Get sub-array of first n elements after shuffled
  // const countriesSubset = countriesShuffled.slice(0, 30);
  // console.log('selected', countriesSubset);
  const countriesSubset = [
    'Lebanon',
    'Honduras',
    'Iraq',
    'Monaco',
    'Guinea',
    'Djibouti',
    'Mongolia',
    'Equatorial Guinea',
    'Nepal',
    'Yemen',
    'Slovakia',
    'Central African Republic',
    'Rwanda',
    'Norway',
    'Austria',
    'Armenia',
    'Chad',
    'Bahamas',
    'Cameroon',
    'Uzbekistan',
    'Colombia',
    'Dominica',
    'Italy',
    'Tanzania',
    'New Zealand',
    'Venezuela',
    'Eswatini',
    'India',
    'Portugal',
    'Azerbaijan'
  ];

  useEffect(() => {
    const getData = async () => {
      const apiCalls = countriesSubset.map(
        async (targetCountry) => await countryAPI(targetCountry)
      );
      console.log('apiCalls', apiCalls);
      const res = await Promise.all(apiCalls);
      const data = res.reduce((prevItem, nextItem) => {
        // console.log('prevItem', prevItem);
        // console.log('nextItem', nextItem.data[0].name);
        const countryData = nextItem.data[0];
        console.log(countryData.name, countryData);
        return { ...prevItem, [countryData.name]: countryData };
      }, {});
      setState(data);
    };
    getData();
  }, []);

  console.log('state:', state);

  const greenness = 0.5; // min 100 (dark green), max: 255 (light)
  const diameter = 150;
  const xPosition = 0.5;
  const yPosition = 0.2;

  return (
    <section className='countries-section'>
      <div className='countries-wrapper'>
        <h1>Countries Page</h1>
        <div className='countries-container'>
          <div className='graph'>
            <FontAwesomeIcon className='caret caret-up' icon={faAngleUp} />
            <FontAwesomeIcon className='caret caret-right' icon={faAngleRight} />
            <div className='data-point norway'>Norway</div>
            <div className='data-point germany'>Germany</div>
            <div
              className='data-point'
              style={{
                backgroundColor: `rgb(0, ${100 + 155 * (1 - greenness)}, 0)`,
                height: `${diameter}px`,
                width: `${diameter}px`,
                // bottom: `${yPosition * 300}px`
                // bottom: '50%',
                left: '50%', // x
                bottom: 0 // y
              }}
            >
              Spain
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countries;
