import { useLogin, useSignUp } from "@/features/auth/hooks";
import { loginSchema, signUpSchema } from "@/features/auth/schema";
import Footer from "@/shared/components/Footer";
import Header from "@/shared/components/Header";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validate = () => {
    if (isLogin) {
      const result = loginSchema.safeParse({ email, password });

      if (!result.success) {
        const fe = result.error.flatten().fieldErrors;
        setErrors({
          name: "",
          email: fe.email?.[0] ?? "",
          password: fe.password?.[0] ?? "",
        });
        return false;
      }

      setErrors({ name: "", email: "", password: "" });
      return true;
    }

    // signup
    const result = signUpSchema.safeParse({ name, email, password });

    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors({
        name: fe.name?.[0] ?? "",
        email: fe.email?.[0] ?? "",
        password: fe.password?.[0] ?? "",
      });
      return false;
    }

    setErrors({ name: "", email: "", password: "" });
    return true;
  };

  const loginMutation = useLogin();
  const signUpMutation = useSignUp();

  const handleSubmit = () => {
    if (!validate()) return;

    if (isLogin) {
      loginMutation.mutate(
        { email, password },
        {
          onSuccess: () => router.replace("/"),
          onError: () => Alert.alert("Error", "Authentication failed"),
        }
      );
    } else {
      signUpMutation.mutate({ name, email, password });
    }
  };

  const loading = loginMutation.isPending || signUpMutation.isPending;

  return (
    <ScrollView className="flex flex-col" showsVerticalScrollIndicator={false}>
      <Header />
      <View className="my-20 w-full">
        <Text className="font-prata mb-5 text-3xl text-center">
          {!isLogin ? "Sign Up" : "Login"}
        </Text>

        {!isLogin && (
          <>
            <TextInput
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              placeholder="Name"
              className="border px-3 font-outfit mb-3 w-full"
            />
            {errors.name ? (
              <Text className="text-red-500 font-semibold font-outfit mb-4">
                {errors.name}
              </Text>
            ) : null}
          </>
        )}

        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          placeholder="Email"
          className="border px-3 font-outfit mb-3 w-full"
        />
        {errors.email ? (
          <Text className="text-red-500 font-semibold font-outfit mb-4">
            {errors.email}
          </Text>
        ) : null}

        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          placeholder="Password"
          secureTextEntry
          className="border px-3 font-outfit mb-3 w-full"
        />
        {errors.password ? (
          <Text className="text-red-500 font-semibold font-outfit mb-4">
            {errors.password}
          </Text>
        ) : null}

        <View className="flex flex-row w-full justify-between mb-5">
          <Text className="font-outfit">Forgot your password?</Text>

          <TouchableOpacity
            onPress={() => {
              setIsLogin(!isLogin);
              setErrors({ name: "", email: "", password: "" });
            }}
          >
            <Text className="font-outfit">
              {isLogin ? "Create Account" : "Login Here"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className={`bg-black self-center px-9 py-3 items-center justify-center ${loading ? "opacity-70" : ""}`}
        >
          {/* for locked width */}
          <Text className="text-white font-outfit opacity-0">
            {isLogin ? "Login" : "Sign Up"}
          </Text>

          <View className="absolute">
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white font-outfit px-9 py-3">
                {isLogin ? "Login" : "Sign Up"}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}
