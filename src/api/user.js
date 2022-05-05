import axios from 'axios';

axios.defaults.withCredentials = true;

export const getUserInfo = async () => {
  const response = await axios.get('http://localhost:8080/api/users');
  return response.data;
};

export const patchUserInfo = async (userInfo) => {
  const response = await axios.post(
    'http://localhost:8080/api/users',
    userInfo,
  );
  return response.status;
};

export const logout = async () => {
  const response = await axios.post('http://localhost:8080/api/users/logout');
  return response.status;
};
