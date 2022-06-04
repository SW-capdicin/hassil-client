import { api } from '@/utils';

export const updateLocation = async (id, data) => {
  const response = await api.patch(
    `/api/reservations/${id}/member/attendance`,
    data,
  );
  return response.data;
};

export const getReservationHistory = async () => {
  const response = await api.get(`/api/reservations/history`);
  return response.data;
};

export const getReservationByCafeUser = async () => {
  const response = await api.get(`/api/study-room-schedules/reservations`);
  return response.data;
};

export const refuseReservation = async (id) => {
  const response = await api.patch(
    `/api/study-room-schedules/reservations/${id}`,
  );
  return response.data;
};
