import axios from 'axios';
const baseUrl = 'http://localhost:5001/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  const response = await request.data;

  return response;
};

const createBlog = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const request = await axios.post(baseUrl, blog, config);
    const response = request.data;

    console.log('Create Blog response', response);
    return response;
  } catch (error) {
    throw Error;
  }
};

const removeBlog = async (id) => {
  try {
    const request = await axios.delete(`${baseUrl}/${id}`);
    const response = request.data;
    console.log('REMOVED BLOG', response);
    return response;
  } catch (error) {
    console.error('Error removing', error);
  }
};

const updateLikes = async (id, blog) => {
  try {
    const request = await axios.put(`${baseUrl}/${id}`, blog);
    const response = request.data;
    console.log('UPDATE RESPONSE', response);
    return response;
  } catch (error) {
    console.error('Error updating likes', error);
  }
};

export default { getAll, createBlog, setToken, removeBlog, updateLikes };
