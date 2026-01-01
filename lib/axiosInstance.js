import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const instance = axios.create({
  baseURL: 'https://foreverclothesapi.vercel.app',
});

instance.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
