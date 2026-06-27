import axios from 'axios';
const api = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAllCountries = () => {
  try {
    const response = axios.get(`${api}/all`);
    return response.then((res) => res.data);
  } catch (error) {
    console.error(error.message);
  }
};

export default {
  getAllCountries,
};
