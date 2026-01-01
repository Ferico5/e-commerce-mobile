import axios from '@/lib/axiosInstance';
import { LoginPayload, SignUpPayload, AuthResponse } from './types';

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await axios.post('auth', payload)
    return res.data
}

export const signUpApi = async (payload: SignUpPayload) => {
    const res = await axios.post('/users', payload);
  return res.data;
}