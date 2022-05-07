import React, { useState, useEffect } from 'react';
import Loading from './Loading';
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

  const showGreenData = (data) => {
    return data ? data.toLocaleString() : 'No Data';
  };

  const showFastFact = (data) => {
    if (data === countryData.gdp_per_capita) {
      // always convert to 2 decimal places and comma-separate 1000s
      return data
        ? Number(countryData.gdp_per_capita).toLocaleString(undefined, {
            minimumFractionDigits: 2
          })
        : 'No Data';
    } else {
      return data ? data : 'No Data';
    }
  };

  return (
    <section className='country-section'>
      <div className='country-wrapper'>
        <h1 className='country-name'>{id}</h1>
        {!countryData ? (
          // <p>Loading Data for {id}...</p>
          <Loading />
        ) : (
          <div className='facts-wrapper'>
            <div className='green-facts'>
              <div className='facts green-fact' id={!countryData.co2_emissions ? 'no-data' : ''}>
                <span className='data-heading'>
                  CO<span className='subscript'>2</span> emissions
                </span>
                <FontAwesomeIcon className='icon' icon={faCloudBolt} />
                <span className='data'>
                  {showGreenData(countryData.co2_emissions)} {countryData.co2_emissions ? 'mt' : ''}
                </span>
              </div>
              <div className='facts green-fact' id={!countryData.forested_area ? 'no-data' : ''}>
                <span className='data-heading'>Forested Area</span>
                <FontAwesomeIcon className='icon' icon={faTree} />
                <span className='data'>
                  {showGreenData(countryData.forested_area)} {countryData.forested_area ? '%' : ''}
                </span>
              </div>
              <div className='facts green-fact' id={!countryData.surface_area ? 'no-data' : ''}>
                <span className='data-heading'>Surface Area</span>
                <FontAwesomeIcon className='icon' icon={faMountain} />
                <span className='data'>
                  {showGreenData(countryData.surface_area)} km
                  <span className='superscript'>2</span>
                </span>
              </div>
              <div className='facts green-fact'>
                <span className='data-heading'>Threatened Species</span>
                <FontAwesomeIcon className='icon' icon={faPaw} />
                <span className='data'>{showGreenData(countryData.threatened_species)}</span>
              </div>
              <div className='facts green-fact'>
                <span className='data-heading'>Number of Tourists</span>
                <FontAwesomeIcon className='icon' icon={faPersonHiking} />
                <span className='data'>{showGreenData(countryData.tourists)},000</span>
              </div>
            </div>

            <div className='fast-facts-container'>
              <div className='facts general-facts'>
                <h3>Geography</h3>
                <div className='fast-facts'>
                  <p>
                    <span className='data-category'>Capital:</span>&nbsp;
                    {showFastFact(countryData.capital)}
                  </p>
                  <p>
                    <span className='data-category'>Region:</span>{' '}
                    {showFastFact(countryData.region)}
                  </p>
                  <p>
                    <span className='data-category'>Currency:</span>&nbsp;
                    {showFastFact(countryData.currency.name)}
                  </p>
                  <p>
                    <span className='data-category'>GDP/capita (US$):</span>&nbsp;
                    {showFastFact(countryData.gdp_per_capita)}
                  </p>
                  <p>
                    <span className='data-category'>Internet Users (%):</span>&nbsp;
                    {showFastFact(countryData.internet_users)}
                  </p>
                </div>
              </div>
              <div className='facts general-facts'>
                <h3>Economy</h3>
                <div className='fast-facts'>
                  <p>
                    <span className='data-category'>Capital:</span>&nbsp;
                    {showFastFact(countryData.capital)}
                  </p>
                  <p>
                    <span className='data-category'>Region:</span>{' '}
                    {showFastFact(countryData.region)}
                  </p>
                  <p>
                    <span className='data-category'>Currency:</span>&nbsp;
                    {showFastFact(countryData.currency.name)}
                  </p>
                  <p>
                    <span className='data-category'>GDP/capita (US$):</span>&nbsp;
                    {showFastFact(countryData.gdp_per_capita)}
                  </p>
                  <p>
                    <span className='data-category'>Internet Users (%):</span>&nbsp;
                    {showFastFact(countryData.internet_users)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Country;
