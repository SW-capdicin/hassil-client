import axios from 'axios';

export const getUserInfo = async () => {
  const response = await axios.get('/api/users');
  return response.data;
};

export const patchUserInfo = async (userInfo) => {
  const response = await axios.patch('/api/users', userInfo);
  return response.status;
};

export const logout = async () => {
  const response = await axios.post('/api/users/logout');
  return response.status;
};
