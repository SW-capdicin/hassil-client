import { api } from '@/utils'

export const uploadOneImage = async data => {
  const response = await api.post('/api/upload/image', data, {
    headers: { 'Content-Type': 'multipart/form-data;charset=utf-8;' }
  });
  return response.data;
};