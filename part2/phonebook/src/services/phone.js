import axios from 'axios';

const url = '/api/people';

const getAll = () => {
  const req = axios.get(url);
  return req.then((res) => res.data);
};

const addPhone = (phone) => {
  try {
    const req = axios.post(url, phone);
    console.log('Adding phone', req.data);
    return req.then((res) => res.data);
  } catch (error) {
    alert(`Error adding the number: ${error}`);
  }
};

const updatePhone = async (phone) => {
  try {
    const req = await axios.put(`${url}/${phone.id}`, phone);
    console.log('Phone update', req.data);
    return req.data;
  } catch (error) {
    alert(`Error updating the number: ${error}`);
  }
};

const removePhone = async (id, phone) => {
  try {
    const req = await axios.delete(`${url}/${id}`);
    return req.data;
  } catch (error) {
    alert(`Error removing the number: ${error}`);
  }
};

export default {
  getAll,
  addPhone,
  updatePhone,
  removePhone,
};
