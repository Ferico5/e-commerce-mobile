import { useAuth } from '@/auth/AuthContext';
import { useCart } from '@/auth/CartContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from '../utils/axiosInstance';

export default function Auth() {
  const { login } = useAuth();
  const { fetchCartCount, resetCart } = useCart();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateFields = () => {
    let newErrors = { name: '', email: '', password: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    if (!isLogin && !name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      if (isLogin) {
        const response = await login(email, password);

        if (response.data.msg === 'Login successful') {
          resetCart();
          fetchCartCount();
          router.push('/index');
        } else {
          alert(response.data.msg);
        }
      } else {
        const res = await axios.post('/users', { name, email, password });

        if (res.data.msg === 'User created!') {
          setIsLogin(true);
          setName('');
          setEmail('');
          setPassword('');
          setErrors({ name: '', email: '', password: '' });
        }
      }
    } catch (error) {
      Alert.alert('Error logging in');
    }
  };

  return (
    <ScrollView className="flex flex-col" showsVerticalScrollIndicator={false}>
      <Header />
      <View className="my-20 w-full">
        <Text className="font-prata mb-5 text-3xl text-center">{!isLogin ? 'Sign Up' : 'Login'}</Text>

        {!isLogin && (
          <>
            <TextInput
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="Name"
              className="border px-3 font-outfit mb-3 w-full"
            />
            {errors.name ? <Text className="text-red-500 font-semibold font-outfit mb-4">{errors.name}</Text> : null}
          </>
        )}

        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          placeholder="Email"
          className="border px-3 font-outfit mb-3 w-full"
        />
        {errors.email ? <Text className="text-red-500 font-semibold font-outfit mb-4">{errors.email}</Text> : null}

        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          placeholder="Password"
          secureTextEntry
          className="border px-3 font-outfit mb-3 w-full"
        />
        {errors.password ? <Text className="text-red-500 font-semibold font-outfit mb-4">{errors.password}</Text> : null}

        <View className="flex flex-row w-full justify-between mb-5">
          <Text className="font-outfit">Forgot your password?</Text>

          <TouchableOpacity
            onPress={() => {
              setIsLogin(!isLogin);
              setErrors({ name: '', email: '', password: '' });
            }}
          >
            <Text className="font-outfit">{isLogin ? 'Create Account' : 'Login Here'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} className="bg-black self-center px-9 py-3">
          <Text className="text-white font-outfit">{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}
