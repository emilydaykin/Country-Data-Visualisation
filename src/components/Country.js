import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { countryAPI } from '../lib/api';

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
        <h1>{id}</h1>
        {!countryData ? (
          <p>Loading Data for {id}...</p>
        ) : (
          <div className='facts-wrapper'>
            <div className='fast-facts'>
              <h3>Fast Facts</h3>
              <p>
                <span>Capital:</span> {countryData.capital}
              </p>
              <p>
                <span>Region:</span> {countryData.region}
              </p>
              <p>
                <span>Currency:</span> {countryData.currency.name}
              </p>
              <p>
                <span>GDP/capita:</span> US$&nbsp;
                {Number(countryData.gdp_per_capita).toLocaleString(undefined, {
                  minimumFractionDigits: 2
                })}
              </p>
              <p>
                <span>Internet Users:</span> {countryData.internet_users}%
              </p>
            </div>
            <div className='co2-facts'>
              <h3>Green Facts</h3>
              <p>Co2 emissions: {countryData.co2_emissions}</p>
              <p>Forested Area: {countryData.forested_area}%</p>
              <p>Surface Area: {countryData.surface_area}</p>
              <p>Threatened Species: {countryData.threatened_species}</p>
              <p>Tourists: {countryData.tourists}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Country;
