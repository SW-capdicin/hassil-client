import { api } from '@/utils'

export const getUserInfo = async () => {
  const response = await api.get('/api/users');
  return response.data;
};

export const patchUserInfo = async (userInfo) => {
  const response = await api.patch('/api/users', userInfo);
  return response.status;
};

export const logout = async () => {
  const response = await api.post('/api/users/logout');
  return response.status;
};
