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
        ? Number(data).toLocaleString(undefined, {
            minimumFractionDigits: 2
          })
        : 'No Data';
    } else if (data === countryData.population) {
      return data ? (data * 1000).toLocaleString() : 'No Data';
    } else if (data === countryData.currency) {
      return data ? `${data.name} (${data.code})` : 'No Data';
      // } else if (data === countryData.exports) {
      //   return data ? data.toLocaleString() : 'No Data';
    } else if (
      data === countryData.gdp ||
      data === countryData.exports ||
      data === countryData.imports
    ) {
      if (!data) {
        return 'No Data';
      } else if (data.toString().length >= 7) {
        return `${(data / 1000000).toFixed(2)} trillion`;
      } else if (data.toString().length >= 4) {
        return `${(data / 1000).toFixed(2)} billion`;
      } else {
        return `${data} million`;
      }
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
              <div className='top-facts'>
                <div className='facts general-facts-top'>
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
                      <span className='data-category'>Population:</span>&nbsp;
                      {showFastFact(countryData.population)}
                    </p>
                    <p>
                      <span className='data-category'>Population Growth:</span>
                      &nbsp;
                      {showFastFact(countryData.pop_growth)}
                    </p>
                    <p>
                      <span className='data-category'>Urban Population (%):</span>&nbsp;
                      {showFastFact(countryData.urban_population)}
                    </p>
                    <p>
                      <span className='data-category'>Refugees:</span>&nbsp;
                      {showFastFact(countryData.refugees)}
                    </p>
                    <p>
                      <span className='data-category'>
                        Population Density (per km<span className='superscript--small'>2</span>):
                      </span>
                      &nbsp;
                      {showFastFact(countryData.pop_density)}
                    </p>
                    <p>
                      <span className='data-category'>Sex Ratio:</span>
                      &nbsp;
                      {showFastFact(countryData.sex_ratio)}
                    </p>
                  </div>
                </div>
                <div className='facts general-facts-top'>
                  <h3>Economy</h3>
                  <div className='fast-facts'>
                    <p>
                      <span className='data-category'>Currency:</span>&nbsp;
                      {showFastFact(countryData.currency)}
                    </p>
                    <p>
                      <span className='data-category'>GDP (US$):</span>&nbsp;
                      {showFastFact(countryData.gdp)}
                    </p>
                    <p>
                      <span className='data-category'>GDP/capita (US$):</span>&nbsp;
                      {showFastFact(countryData.gdp_per_capita)}
                    </p>
                    <p>
                      <span className='data-category'>Internet Users (%):</span>&nbsp;
                      {showFastFact(countryData.internet_users)}
                    </p>
                    <p>
                      <span className='data-category'>Unemployment (%):</span>
                      &nbsp;
                      {showFastFact(countryData.unemployment)}
                    </p>
                    <p>
                      <span className='data-category'>
                        Homicide Rate (per 100,000 inhabitants):
                      </span>
                      &nbsp;
                      {showFastFact(countryData.homicide_rate)}
                    </p>
                    <p>
                      <span className='data-category'>Exports (US$):</span>
                      &nbsp;
                      {showFastFact(countryData.exports)}
                    </p>
                    <p>
                      <span className='data-category'>Imports (US$):</span>
                      &nbsp;
                      {showFastFact(countryData.imports)}
                    </p>
                  </div>
                </div>
              </div>
              <div className='facts general-facts-bottom'>
                <h3>Education & Health (PIE & BAR CHARTS)</h3>
                <div className='fast-facts'>
                  <p>
                    <span className='data-category'>Infant Mortality (per 1,000 live births):</span>
                    &nbsp;
                    {showFastFact(countryData.infant_mortality)}
                  </p>
                  <p>
                    <span className='data-category'>Fertility (births per woman):</span>
                    &nbsp;
                    {showFastFact(countryData.fertility)}
                  </p>
                  <p>
                    <span className='data-category'>Employment Agriculture (%):</span>
                    &nbsp;
                    {showFastFact(countryData.employment_agriculture)}
                  </p>
                  <p>
                    <span className='data-category'>Employment Industry (%):</span>
                    &nbsp;
                    {showFastFact(countryData.employment_industry)}
                  </p>
                  <p>
                    <span className='data-category'>Employment Services (%):</span>
                    &nbsp;
                    {showFastFact(countryData.employment_services)}
                  </p>
                  <p>
                    <span className='data-category'>Life expectancy (female):</span>
                    &nbsp;
                    {showFastFact(countryData.life_expectancy_female)}
                  </p>
                  <p>
                    <span className='data-category'>Life expectancy (male):</span>
                    &nbsp;
                    {showFastFact(countryData.life_expectancy_male)}
                  </p>
                  <p>
                    <span className='data-category'>Primary school enrollment (female):</span>
                    &nbsp;
                    {showFastFact(countryData.primary_school_enrollment_female)}
                  </p>
                  <p>
                    <span className='data-category'>Primary school enrollment (male):</span>
                    &nbsp;
                    {showFastFact(countryData.primary_school_enrollment_male)}
                  </p>
                  <p>
                    <span className='data-category'>Secondary school enrollment (female):</span>
                    &nbsp;
                    {showFastFact(countryData.secondary_school_enrollment_female)}
                  </p>
                  <p>
                    <span className='data-category'>Secondary school enrollment (male):</span>
                    &nbsp;
                    {showFastFact(countryData.secondary_school_enrollment_male)}
                  </p>
                  <p>
                    <span className='data-category'>
                      Post Secondary school enrollment (female):
                    </span>
                    &nbsp;
                    {showFastFact(countryData.post_secondary_enrollment_female)}
                  </p>
                  <p>
                    <span className='data-category'>Post Secondary school enrollment (male):</span>
                    &nbsp;
                    {showFastFact(countryData.post_secondary_enrollment_male)}
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
