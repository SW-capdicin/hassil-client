import { api } from '@/utils';
import axios from 'axios';

export const updateLocation = async (id, data) => {
  const response = await axios.patch(
    `/api/reservations/${id}/member/attendance`,
    data,
  );
  return response.data;
};
