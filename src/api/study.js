import axios from 'axios';

export const createStudy = async data => {
  const response = await axios.post('/api/studies', data);
  return response.data;
};

export const findStudy = async id => {
  const response = await axios.get('/api/studies/' + id);
  return response.data;
};
