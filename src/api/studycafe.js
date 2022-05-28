import { api } from '@/utils';

export const createStudyCafe = async (data) => {
  const response = await api.post('/api/study-cafes', data);
  return response.data;
};

export const getStudyCafesByRegion = async () => {
  const response = await api.get('/api/study-cafes/region2DepthNames');
  return response.data;
};

export const getOneStudyCafe = async (id) => {
  const response = await api.get(`/api/study-cafes/${id}`);
  return response.data;
};
export const getStudyRoomsInStudyCafe = async (id) => {
  const response = await api.get(`/api/study-cafes/${id}/rooms`);
  return response.data;
};
