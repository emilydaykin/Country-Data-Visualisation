import React from 'react';
import { useParams } from 'react-router-dom';

const Loading = () => {
  const { id } = useParams();
  console.log('id', id);

  return !id ? (
    <div className='loading'>Loading data for all countries...</div>
  ) : (
    <div className='loading'>Loading data for {id}...</div>
  );
};

export default Loading;
