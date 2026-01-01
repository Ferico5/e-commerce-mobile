import { useMutation } from '@tanstack/react-query';
import { loginApi, signUpApi } from './api';

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUpApi,
  });
};
