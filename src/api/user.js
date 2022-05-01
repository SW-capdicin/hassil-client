import axios from 'axios';

export const getUserInfo = async () => {
  const response = await axios.get('/api/users');
  return response.data;
};
