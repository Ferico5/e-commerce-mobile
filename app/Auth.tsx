import { useAuth } from '@/auth/AuthContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { signUpRequest } from '@/queries/auth';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Auth() {
  const { login, isLoggingIn } = useAuth();
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

  const signUpMutation = useMutation({
    mutationFn: signUpRequest,
    onSuccess: () => {
      Alert.alert('Success', 'Account created. Please login.');
      setIsLogin(true);
      setName('');
      setEmail('');
      setPassword('');
    },
  });

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      if (isLogin) {
        await login(email, password);
        router.replace('/');
      } else {
        signUpMutation.mutate({ name, email, password });
      }
    } catch {
      Alert.alert('Error', 'Authentication failed');
    }
  };

  const loading = isLoggingIn || signUpMutation.isPending;

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

        <TouchableOpacity onPress={handleSubmit} disabled={loading} className={`bg-black self-center px-9 py-3 items-center justify-center ${loading ? 'opacity-70' : ''}`}>
          {/* for locked width */}
          <Text className="text-white font-outfit opacity-0">{isLogin ? 'Login' : 'Sign Up'}</Text>

          <View className="absolute">{loading ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-white font-outfit px-9 py-3">{isLogin ? 'Login' : 'Sign Up'}</Text>}</View>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}
