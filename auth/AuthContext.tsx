import { loginRequest } from '@/queries/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type UserProps = {
  _id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextProps = {
  token: string | null;
  user: UserProps | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authReady: boolean;
  isLoggingIn: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const queryClient = useQueryClient();

  // load stored auth
  useEffect(() => {
    const load = async () => {
      const savedToken = await SecureStore.getItemAsync('token');
      const savedUser = await AsyncStorage.getItem('user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
      setAuthReady(true);
    };
    load();
  }, []);

  // sync auth
  useEffect(() => {
    const sync = async () => {
      if (token && user) {
        await SecureStore.setItemAsync('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        await SecureStore.deleteItemAsync('token');
        await AsyncStorage.removeItem('user');
      }
    };
    sync();
  }, [token, user]);

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    queryClient.setQueryData(['cart'], []);
    queryClient.removeQueries({ queryKey: ['cart'] });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authReady,
        login,
        logout,
        isLoggingIn: loginMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
