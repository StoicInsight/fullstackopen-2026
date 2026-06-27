import React from 'react';
import './index.css';

const Country = (countries) => {
  if (countries.country.length >= 1 && countries.country.length <= 20) {
    return (
      <div className='container'>
        {countries.country.map((count) => (
          <p>{count.name.official}</p>
        ))}
      </div>
    );
  } else return <h1>Search for countries</h1>;
};

export default Country;
