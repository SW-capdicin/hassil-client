import { api } from '@/utils';

export const createStudy = async (data) => {
  const response = await api.post('/api/studies', data);
  return response.data;
};

export const findStudy = async (id) => {
  const response = await api.get('/api/studies/' + id);
  return response.data;
};

export const findJoinedStudy = async () => {
  const response = await api.get('/api/studies/joined');
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

export const createReservation = async (id, data) => {
  const response = await api.post(`/api/studies/${id}/reservations`, data);
  return response.data;
};
export const getReservation = async (id) => {
  const response = await api.get(`/api/studies/${id}/reservations`);
  return response.data;
};
export const getOneReservationInfo = async (studyId, reservationId) => {
  const response = await api.get(
    `/api/studies/${studyId}/reservations/${reservationId}`,
  );
  return response.data;
};
