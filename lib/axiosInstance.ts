import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const instance = axios.create({
  baseURL: 'https://foreverclothesapi.vercel.app',
});

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
