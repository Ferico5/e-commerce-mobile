import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

type UserProps = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextProps = {
  token: string | null;
  user: UserProps | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  authReady: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [authReady, setAuthReady] = useState(false);

  //   Load data login saat app pertama kali dibuka
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const savedToken = await SecureStore.getItemAsync('token');
        const savedUser = await AsyncStorage.getItem('user');

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } finally {
        setAuthReady(true);
      }
    };

    loadStoredAuth();
  }, []);

  //   Simpan data login setiap kali token/user berubah
  useEffect(() => {
    const syncAuth = async () => {
      if (token && user) {
        await SecureStore.setItemAsync('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        await SecureStore.deleteItemAsync('token');
        await AsyncStorage.removeItem('user');
      }
    };

    syncAuth();
  }, [token, user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/auth', { email, password });

      if (response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
      }
      return response;
    } catch (error: any) {
      return error.response || { data: { msg: 'Server error' } };
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await SecureStore.deleteItemAsync('token');
    await AsyncStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ token, user, authReady, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider! Contact the Developer!');
  return context;
};
