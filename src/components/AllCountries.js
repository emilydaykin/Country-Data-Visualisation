import React, { useState, useEffect } from 'react';
import BubbleChart from './BubbleChart';
import Loading from './Loading';
import { countriesToDisplay } from '../lib/countryList';
import { countryAPI } from '../lib/api';

const AllCountries = () => {
  const [countries, setCountries] = useState({});
  const [firstQuantile, setFirstQuantile] = useState([]);
  const [secondQuantile, setSecondQuantile] = useState([]);
  const [thirdQuantile, setThirdQuantile] = useState({});
  const [fourthQuantile, setFourthQuantile] = useState({});
  const [fifthQuantile, setFifthQuantile] = useState({});
  const [sixthQuantile, setSixthQuantile] = useState({});

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
      // rank data by forested area
      setCountries(data);
      const dataArray = Object.values(data);
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

  // GDP (in millions)
  // >10,000,000(,000,000) = 10 trillion
  // > 1,000,000(,000,000) = 1 trillion
  // > 100,000(,000,000) = 100 billion
  // > 10,000(,000,000) = 10 billion
  // > 1,000(,000,000) = 1 billion
  // [0 , 1,000](,000,000) = 1 billion

  console.log('countries', countries);
  console.log('countriesArray', Object.values(countries));

  // GET MAX GDP:
  console.log(
    'MAX GDP',
    Math.max.apply(
      Math,
      Object.values(countries).map((country) => {
        return isNaN(country.gdp) ? 0 : country.gdp;
      })
    )
  );
  // GET MIN GDP:
  console.log(
    'MIN GDP',
    Math.min.apply(
      Math,
      Object.values(countries).map((country) => {
        // replacing Nans with the max value
        return isNaN(country.gdp) ? 20580223 : country.gdp;
      })
    )
  );

  console.log(
    'country >20m GDP:',
    Object.values(countries).filter((country) => country.gdp > 20000000)
  );

  // GDP (in millions)
  // >10,000,000
  // > 1,000,000
  // > 100,000
  // > 10,000
  // > 1,000
  // [0 , 1,000]

  if (Object.keys(firstQuantile).length > 0) {
    console.log('firstQuantile', firstQuantile);
    console.log(
      'firstQuantile',
      firstQuantile.map((country) => country.name)
    );
  }
  if (Object.keys(secondQuantile).length > 0) {
    console.log(
      'secondQuantile',
      secondQuantile.map((country) => country.name)
    );
  }
  if (Object.keys(thirdQuantile).length > 0) {
    console.log(
      'thirdQuantile',
      thirdQuantile.map((country) => country.name)
    );
  }
  if (Object.keys(fourthQuantile).length > 0) {
    console.log(
      '4th Quantile',
      fourthQuantile.map((country) => country.name)
    );
  }
  if (Object.keys(fifthQuantile).length > 0) {
    console.log(
      '5th Quantile',
      fifthQuantile.map((country) => country.name)
    );
  }
  if (Object.keys(sixthQuantile).length > 0) {
    console.log(
      '6th Quantile',
      sixthQuantile.map((country) => country.name)
    );
  }

  return (
    <section className='countries-section'>
      <div className='countries-wrapper'>
        <h1 className='countries-name'>All Countries</h1>
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
      </div>
    </section>
  );
};

export default AllCountries;
