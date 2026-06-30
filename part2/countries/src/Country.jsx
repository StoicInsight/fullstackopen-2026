import React, { useEffect } from 'react';
import { useState } from 'react';
import './index.css';

const Country = ({ countries, showCountry }) => {
  const [languages, setLanguages] = useState([]);
  console.log('CX', countries);
  useEffect(() => {
    if (countries.country.length === 1) {
      console.log('languages from if', countries);
      setLanguages(countries.country[0].languages);
      // setLanguages(Object.assign({}, countries.country[0].languages));
    }
  }, [countries]);

  console.log('languages', countries);

  if (countries.country.length === 1) {
    return (
      <div className=''>
        <h1>{countries.country[0].name.official}</h1>
        <p>{countries.country[0].capital[0]}</p>
        <p>{countries.country[0].area}</p>

        <h1>Langauages</h1>
        <ul>
          {Object.values(languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={countries.country[0].flags.png} alt='' />
      </div>
    );
  } else if (countries.country.length >= 1 && countries.country.length <= 20) {
    return (
      <div className='container'>
        {countries.country.map((count) => (
          <div>
            <p>{count.name.official}</p>
            <button onClick={() => showCountries()}>show</button>
          </div>
        ))}
      </div>
    );
  } else return <h1>Search for country</h1>;
};

export default Country;
