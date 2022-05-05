import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { countryAPI } from '../lib/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMountain,
  faTree,
  faCloudBolt,
  faPaw,
  faPersonHiking
} from '@fortawesome/free-solid-svg-icons';

const Country = () => {
  const { id } = useParams();
  console.log('id', id);
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    setCountryData(null);
    const getCountryData = async () => {
      const resp = await countryAPI(id);
      setCountryData(resp.data[0]);
    };
    getCountryData();
  }, [id]);

  console.log('countryData', countryData);

  return (
    <section className='country-section'>
      <div className='country-wrapper'>
        <h1 className='country-name'>{id}</h1>
        {!countryData ? (
          <p>Loading Data for {id}...</p>
        ) : (
          <div className='facts-wrapper'>
            <div className='facts fast-facts'>
              <h3>Fast Facts</h3>
              <p>
                <span className='data-category'>Capital:</span> {countryData.capital}
              </p>
              <p>
                <span className='data-category'>Region:</span> {countryData.region}
              </p>
              <p>
                <span className='data-category'>Currency:</span> {countryData.currency.name}
              </p>
              <p>
                <span className='data-category'>GDP/capita:</span> US$&nbsp;
                {Number(countryData.gdp_per_capita).toLocaleString(undefined, {
                  minimumFractionDigits: 2
                })}
              </p>
              <p>
                <span className='data-category'>Internet Users:</span> {countryData.internet_users}%
              </p>
            </div>
            <div className='facts all-green-facts'>
              <h3>Green Facts</h3>
              <p>
                <FontAwesomeIcon icon={faCloudBolt} />
                <span className='data-category'>
                  CO<span className='subscript'>2</span> emissions:
                </span>{' '}
                {countryData.co2_emissions.toLocaleString()} mt
              </p>
              <p>
                <FontAwesomeIcon icon={faTree} />
                <span className='data-category'>Forested Area:</span> {countryData.forested_area}%
              </p>
              <p>
                <FontAwesomeIcon icon={faMountain} />
                <span className='data-category'>Surface Area:</span>{' '}
                {countryData.surface_area.toLocaleString()} km
                <span className='superscript'>2</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faPaw} />
                <span className='data-category'>Threatened Species (n):</span>{' '}
                {countryData.threatened_species.toLocaleString()}
              </p>
              <p>
                <FontAwesomeIcon icon={faPersonHiking} />
                <span className='data-category'>Tourists ('000s):</span>{' '}
                {countryData.tourists.toLocaleString()}
              </p>
            </div>
            <div className='green-facts-TEMP'>
              <div className='facts green-fact'>
                <span className='data-heading'>
                  CO<span className='subscript'>2</span> emissions
                </span>
                <FontAwesomeIcon className='icon' icon={faCloudBolt} />
                <span className='data'>{countryData.co2_emissions.toLocaleString()} mt</span>
              </div>
              <div className='facts green-fact'>
                <span className='data-heading'>Forested Area</span>
                <FontAwesomeIcon className='icon' icon={faTree} />
                <span className='data'>{countryData.forested_area}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Country;
