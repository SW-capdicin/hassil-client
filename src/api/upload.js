import { api } from '@/utils';
import axios from 'axios';

export const uploadOneImage = async (data) => {
  const response = await axios.post('/api/upload/image', data, {
    headers: { 'Content-Type': 'multipart/form-data;charset=utf-8;' },
  });
  return response.data;
};
