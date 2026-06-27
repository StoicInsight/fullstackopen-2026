import { useState, useEffect } from 'react';
import countryService from './service/api';
import Country from './Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const allCountries = countryService
      .getAllCountries()
      .then((res) => setCountries(res))
      .then((res) => setAllCountries(res));
  }, []);

  const filterCountries = () => {
    const filtered = allCountries.filter((country) => {
      const lowerCountry = country.name.official.toLowerCase();
      return lowerCountry.includes(search);
    });
      setCountries(filtered);
    }
  };

  const changeSearch = (e) => {
    setSearch(e.target.value);
    filterCountries();
  };

  return (
    <div className=''>
      <div className=''>
        <p>Find countries</p>
        <input type='text' value={search} onChange={changeSearch} />
      </div>
      <Country country={countries} />
    </div>
  );
}

export default App;
