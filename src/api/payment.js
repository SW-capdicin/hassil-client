import { api } from '@/utils';
import axios from 'axios';

export const paymentSuccess = async (params) => {
  const response = await axios.get('/api/payment/success', { params });
  return response.data;
};
