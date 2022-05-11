import { api } from '@/utils'

export const createStudy = async (data) => {
  const response = await api.post('/api/studies', data);
  return response.data;
};

export const findStudy = async (id) => {
  const response = await api.get('/api/studies/' + id);
  return response.data;
};

export const getStudyList = async () => {
  const response = await api.get('/api/studies');
  return response.data;
};

export const getStudyAttend = async (id) => {
  const response = await api.get(`/api/studies/${id}/member`);
  return response.data;
};

export const joinStudy = async (id) => {
  const response = await api.post(`/api/studies/${id}/member`);
  return response.data;
};