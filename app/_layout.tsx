import "@/global.css";
import { Stack } from 'expo-router';
import { useFonts } from "expo-font";
import {Outfit_400Regular} from '@expo-google-fonts/outfit'
import {Prata_400Regular} from '@expo-google-fonts/prata'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Prata_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product" options={{ headerShown: false }} />
      <Stack.Screen name="[...missing]" options={{}} />
    </Stack>
  );
}