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
            <div className='facts fast-facts'>
              <h3>Fast Facts</h3>
              <p>
                <span className='data-category'>Capital:</span> {showFastFact(countryData.capital)}
              </p>
              <p>
                <span className='data-category'>Region:</span> {showFastFact(countryData.region)}
              </p>
              <p>
                <span className='data-category'>Currency:</span>{' '}
                {showFastFact(countryData.currency.name)}
              </p>
              <p>
                <span className='data-category'>GDP/capita (US$):</span>&nbsp;
                {/* {Number(countryData.gdp_per_capita).toLocaleString(undefined, {
                  minimumFractionDigits: 2
                })} */}
                {showFastFact(countryData.gdp_per_capita)}
              </p>
              <p>
                <span className='data-category'>Internet Users (%):</span>{' '}
                {showFastFact(countryData.internet_users)}
              </p>
            </div>
            <div className='facts all-green-facts'>
              <h3>Green Facts</h3>
              <p>
                <FontAwesomeIcon icon={faCloudBolt} />
                <span className='data-category'>
                  CO<span className='subscript'>2</span> emissions (mt):
                </span>{' '}
                {showGreenData(countryData.co2_emissions)}
              </p>
              <p>
                <FontAwesomeIcon icon={faTree} />
                <span className='data-category'>Forested Area (%):</span>{' '}
                {showGreenData(countryData.forested_area)}
              </p>
              <p>
                <FontAwesomeIcon icon={faMountain} />
                <span className='data-category'>
                  Surface Area (km<span className='superscript'>2</span>):
                </span>{' '}
                {showGreenData(countryData.surface_area)}
              </p>
              <p>
                <FontAwesomeIcon icon={faPaw} />
                <span className='data-category'>Threatened Species (n):</span>{' '}
                {showGreenData(countryData.threatened_species)}
              </p>
              <p>
                <FontAwesomeIcon icon={faPersonHiking} />
                <span className='data-category'>Tourists ('000s):</span>{' '}
                {showGreenData(countryData.tourists)}
              </p>
            </div>
            <div className='green-facts-TEMP'>
              <div className='facts green-fact'>
                <span className='data-heading'>
                  CO<span className='subscript'>2</span> emissions
                </span>
                <FontAwesomeIcon className='icon' icon={faCloudBolt} />
                <span className='data'>{showGreenData(countryData.co2_emissions)} mt</span>
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
