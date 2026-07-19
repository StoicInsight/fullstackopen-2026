import axios from 'axios';
const baseUrl = 'http://localhost:5001/api/login';

const login = async (username, password) => {
  // if (!username || password) {
  //   throw new Error({ message: 'missing username or password' });
  // }

  try {
    const request = await axios.post(baseUrl, { username, password });
    const respose = request.data;
    return respose;
  } catch (error) {
    console.error('Error auth', error);
    throw error;
  }
};

export default login;
