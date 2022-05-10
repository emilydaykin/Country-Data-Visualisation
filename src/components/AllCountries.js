import React, { useState, useEffect } from 'react';
import BubbleChart from './BubbleChart';
import GreenBarChart from './GreenBarChart';
import RadarChart from './RadarChart';
import Loading from './Loading';
import { countriesToDisplay } from '../lib/countryList';
import { countryAPI } from '../lib/api';

const AllCountries = () => {
  const [firstQuantile, setFirstQuantile] = useState([]);
  const [secondQuantile, setSecondQuantile] = useState([]);
  const [thirdQuantile, setThirdQuantile] = useState({});
  const [fourthQuantile, setFourthQuantile] = useState({});
  const [fifthQuantile, setFifthQuantile] = useState({});
  const [sixthQuantile, setSixthQuantile] = useState({});

  const [asiaCountries, setAsiaCountries] = useState({});
  const [africaCountries, setAfricaCountries] = useState({});
  const [europeCountries, setEuropeCountries] = useState({});
  const [northAmericaCountries, setNorthAmericaCountries] = useState({});
  const [southAmericaCountries, setSouthAmericaCountries] = useState({});
  const [oceaniaCountries, setOceaniaCountries] = useState({});

  useEffect(() => {
    const getData = async () => {
      const apiCalls = countriesToDisplay.map(
        async (targetCountry) => await countryAPI(targetCountry)
      );
      const res = await Promise.all(apiCalls);
      const data = res.reduce((prevItem, nextItem) => {
        const countryData = nextItem.data[0];
        return { ...prevItem, [countryData.name]: countryData };
      }, {});

      const dataArray = Object.values(data);

      const asia = dataArray.filter((country) => country.region.toLowerCase().includes('asia'));
      setAsiaCountries(asia);
      const africa = dataArray.filter((country) => country.region.toLowerCase().includes('africa'));
      setAfricaCountries(africa);
      const europe = dataArray.filter((country) => country.region.toLowerCase().includes('europe'));
      setEuropeCountries(europe);
      const northAmerica = dataArray.filter(
        (country) =>
          country.region.toLowerCase().includes('northern america') ||
          country.region.toLowerCase().includes('caribbean') ||
          country.region.toLowerCase().includes('central america')
      );
      setNorthAmericaCountries(northAmerica);
      const southAmerica = dataArray.filter((country) =>
        country.region.toLowerCase().includes('south america')
      );
      setSouthAmericaCountries(southAmerica);
      const oceania = dataArray.filter(
        (country) =>
          country.region.toLowerCase().includes('oceania') ||
          country.region.toLowerCase().includes('melanesia') ||
          country.region.toLowerCase().includes('micronesia') ||
          country.region.toLowerCase().includes('polynesia')
      );
      setOceaniaCountries(oceania);

      // rank data by GDP
      const first = dataArray.filter((country) => country.gdp >= 10000000);
      setFirstQuantile(first);
      const second = dataArray.filter(
        (country) => country.gdp >= 1000000 && country.gdp < 10000000
      );
      setSecondQuantile(second);
      const third = dataArray.filter((country) => country.gdp >= 100000 && country.gdp < 1000000);
      setThirdQuantile(third);
      const fourth = dataArray.filter((country) => country.gdp >= 10000 && country.gdp < 100000);
      setFourthQuantile(fourth);
      const fifth = dataArray.filter((country) => country.gdp >= 1000 && country.gdp < 10000);
      setFifthQuantile(fifth);
      const sixth = dataArray.filter((country) => country.gdp < 1000);
      setSixthQuantile(sixth);
    };
    getData();
  }, []);

  return (
    <section className='countries__section'>
      <div className='countries__wrapper'>
        <h1 className='countries__name'>All Countries</h1>
        {Object.keys(firstQuantile).length === 0 ||
        Object.keys(secondQuantile).length === 0 ||
        Object.keys(thirdQuantile).length === 0 ||
        Object.keys(fourthQuantile).length === 0 ||
        Object.keys(fifthQuantile).length === 0 ||
        Object.keys(sixthQuantile).length === 0 ? (
          <Loading />
        ) : (
          <BubbleChart
            firstQuantile={firstQuantile}
            secondQuantile={secondQuantile}
            thirdQuantile={thirdQuantile}
            fourthQuantile={fourthQuantile}
            fifthQuantile={fifthQuantile}
            sixthQuantile={sixthQuantile}
          />
        )}

        {Object.keys(asiaCountries).length === 0 ||
        Object.keys(africaCountries).length === 0 ||
        Object.keys(europeCountries).length === 0 ||
        Object.keys(northAmericaCountries).length === 0 ||
        Object.keys(southAmericaCountries).length === 0 ||
        Object.keys(oceaniaCountries).length === 0 ? (
          <Loading />
        ) : (
          <>
            <GreenBarChart
              asiaCountries={asiaCountries}
              africaCountries={africaCountries}
              europeCountries={europeCountries}
              northAmericaCountries={northAmericaCountries}
              southAmericaCountries={southAmericaCountries}
              oceaniaCountries={oceaniaCountries}
            />
            <div className='countries__radar-chart'>
              <RadarChart
                asiaCountries={asiaCountries}
                africaCountries={africaCountries}
                europeCountries={europeCountries}
                northAmericaCountries={northAmericaCountries}
                southAmericaCountries={southAmericaCountries}
                oceaniaCountries={oceaniaCountries}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AllCountries;
