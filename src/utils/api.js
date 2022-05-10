import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

const api = axios.create({
  baseURL: `${VITE_API_URL}`
});

export const get = (path, params, headers) => api.get(path, { params }, headers);

export const post = (path, body, headers) => api.post(path, body, headers);

export const patch = (path, body, headers) => api.patch(path, body, headers);