import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import { countryAPI } from '../lib/api';
import DoughnutChart from './DonutChart';
import SingleBarChart from './SingleBarChart';
import GroupedBarChart from './GroupedBarChart';
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
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    setCountryData(null);
    const getCountryData = async () => {
      const resp = await countryAPI(id);
      setCountryData(resp.data[0]);
    };
    getCountryData();
  }, [id]);

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
    <section className='country'>
      <div className='country__wrapper'>
        <h1 className='country__name'>{id}</h1>
        {!countryData ? (
          <Loading />
        ) : (
          <div className='facts-wrapper'>
            <div className='facts-wrapper__green-facts'>
              <div
                className='facts-wrapper__facts green-fact'
                id={!countryData.co2_emissions ? 'no-data' : ''}
              >
                <span className='data-heading'>
                  CO<span className='subscript'>2</span> emissions
                </span>
                <FontAwesomeIcon className='icon' icon={faCloudBolt} />
                <span className='data'>
                  {showGreenData(countryData.co2_emissions)} {countryData.co2_emissions ? 'mt' : ''}
                </span>
              </div>
              <div
                className='facts-wrapper__facts green-fact'
                id={!countryData.forested_area ? 'no-data' : ''}
              >
                <span className='data-heading'>Forested Area</span>
                <FontAwesomeIcon className='icon' icon={faTree} />
                <span className='data'>
                  {showGreenData(countryData.forested_area)} {countryData.forested_area ? '%' : ''}
                </span>
              </div>
              <div
                className='facts-wrapper__facts green-fact'
                id={!countryData.surface_area ? 'no-data' : ''}
              >
                <span className='data-heading'>Surface Area</span>
                <FontAwesomeIcon className='icon' icon={faMountain} />
                <span className='data'>
                  {showGreenData(countryData.surface_area)} km
                  <span className='superscript'>2</span>
                </span>
              </div>
              <div className='facts-wrapper__facts green-fact'>
                <span className='data-heading'>Threatened Species</span>
                <FontAwesomeIcon className='icon' icon={faPaw} />
                <span className='data'>{showGreenData(countryData.threatened_species)}</span>
              </div>
              <div className='facts-wrapper__facts green-fact'>
                <span className='data-heading'>Number of Tourists</span>
                <FontAwesomeIcon className='icon' icon={faPersonHiking} />
                <span className='data'>{showGreenData(countryData.tourists)},000</span>
              </div>
            </div>

            <div className='facts-wrapper__general-facts-container'>
              <div className='top-facts-container'>
                <div className='facts-wrapper__facts top-facts-container__general-facts-top'>
                  <h3>
                    {id}'s <span>Geography</span>
                  </h3>
                  <div className='general-facts'>
                    <p>
                      <span className='general-facts__data-category'>Capital:</span>&nbsp;
                      {showFastFact(countryData.capital)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>Region:</span>{' '}
                      {showFastFact(countryData.region)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>Population:</span>&nbsp;
                      {showFastFact(countryData.population)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>Population Growth:</span>
                      &nbsp;
                      {showFastFact(countryData.pop_growth)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>Urban Population (%):</span>
                      &nbsp;
                      {showFastFact(countryData.urban_population)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>Refugees:</span>&nbsp;
                      {showFastFact(countryData.refugees)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>
                        Population Density (per km<span className='superscript--small'>2</span>):
                      </span>
                      &nbsp;
                      {showFastFact(countryData.pop_density)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>Sex Ratio:</span>
                      &nbsp;
                      {showFastFact(countryData.sex_ratio)}
                    </p>
                  </div>
                </div>
                <div className='facts-wrapper__facts general-facts-top'>
                  <h3>
                    {id}'s <span>Economy</span>
                  </h3>
                  <div className='general-facts'>
                    <p>
                      <span className='general-facts__data-category'>Currency:</span>&nbsp;
                      {showFastFact(countryData.currency)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>GDP (US$):</span>&nbsp;
                      {showFastFact(countryData.gdp)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>GDP/capita (US$):</span>&nbsp;
                      {showFastFact(countryData.gdp_per_capita)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>Internet Users (%):</span>
                      &nbsp;
                      {showFastFact(countryData.internet_users)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>Unemployment (%):</span>
                      &nbsp;
                      {showFastFact(countryData.unemployment)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>
                        Homicide Rate (per 100,000 inhabitants):
                      </span>
                      &nbsp;
                      {showFastFact(countryData.homicide_rate)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>Exports (US$):</span>
                      &nbsp;
                      {showFastFact(countryData.exports)}
                    </p>
                    <p>
                      <span className='general-facts__data-category'>Imports (US$):</span>
                      &nbsp;
                      {showFastFact(countryData.imports)}
                    </p>
                  </div>
                </div>
              </div>
              <div className='facts-wrapper__facts general-facts-container-bottom'>
                <h3>
                  <span>Education & Health</span> in {id}
                </h3>
                <div className='general-facts'>
                  <div className='general-facts__country-health-text'>
                    <p className='general-facts__health-paragraph'>
                      <span className='general-facts__data-category general-facts__data-category--health'>
                        Infant Mortality <br /> (per 1,000 live births)
                      </span>
                      &nbsp;
                      <span className='data-point'>
                        {showFastFact(countryData.infant_mortality)}
                      </span>
                    </p>
                    <p className='general-facts__health-paragraph'>
                      <span className='general-facts__data-category general-facts__data-category--health'>
                        Fertility <br />
                        (births per woman)
                      </span>
                      &nbsp;
                      <span className='data-point'>{showFastFact(countryData.fertility)}</span>
                    </p>
                  </div>
                  <div className='single-country-plots'>
                    <div className='single-country-plots__country-pie-chart'>
                      <DoughnutChart countryData={countryData} />
                    </div>
                    <div className='single-country-plots__country-bar-charts'>
                      <SingleBarChart countryData={countryData} />
                      <GroupedBarChart countryData={countryData} />
                    </div>
                  </div>
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
