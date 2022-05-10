import React from 'react';
import { useParams } from 'react-router-dom';

const Loading = () => {
  const { id } = useParams();

  return !id ? (
    <div className='loading'>Loading data for 192 countries...</div>
  ) : (
    <div className='loading loading--dark'>Loading data for {id}...</div>
  );
};

export default Loading;
