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

export const searchStudyCafe = async (keyword) => {
  const response = await api.get(`/api/study-cafes/search`, keyword);
  return response.data;
};
export const getStudyCafeByUserId = async () => {
  const response = await api.get(`/api/study-cafes/mine`);
  return response.data;
};
export const getStudyRoomSchedulesOfDate = async (id, rid, data) => {
  const response = await api.get(
    `/api/study-cafes/${id}/rooms/${rid}/study-room-schedules`,
    data,
  );
  return response.data;
};
