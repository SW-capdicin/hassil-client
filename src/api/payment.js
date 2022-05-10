import { api } from '@/utils'

export const paymentSuccess = async params => {
  const response = await api.get('/api/payment/success', { params });
  return response.data;
};
