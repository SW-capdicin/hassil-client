import { api } from '@/utils';

export const updateLocation = async (id, data) => {
  const response = await api.patch(
    `/api/reservations/${id}/member/attendance`,
    data,
  );
  return response.data;
};
