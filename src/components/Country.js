import React from 'react';
import { useParams } from 'react-router-dom';

const Country = () => {
  const params = useParams();

  console.log('params', params);
  return (
    <section className='country-section'>
      <div className='country-wrapper'>
        <h1>{params.id}</h1>
      </div>
    </section>
  );
};

export default Country;
