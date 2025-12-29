import axios from '@/utils/axiosInstance';

export const loginRequest = async (body: { email: string; password: string }) => {
  const res = await axios.post('/auth', body);
  return res.data;
};

export const signUpRequest = async (body: { name: string; email: string; password: string }) => {
  const res = await axios.post('/users', body);
  return res.data;
};
