import { api } from '@/utils';

export const requestStudyRecommend = async (body) => {
  const { data }  = await api.post('/api/schedule-recommend', body);
  return data;
}