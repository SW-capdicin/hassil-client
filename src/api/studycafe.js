import { api } from '@/utils';

export const createStudyCafe = async (data) => {
  const response = await api.post('/api/study-cafes', data);
  return response.data;
};
