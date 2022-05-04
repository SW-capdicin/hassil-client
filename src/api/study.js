import axios from 'axios';

export const createStudy = async data => {
  const response = await axios.post('/api/studies', data);
  return response.data;
};
