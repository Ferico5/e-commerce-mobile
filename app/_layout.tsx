import { AuthProvider } from '@/auth/AuthContext';
import { CartProvider } from '@/auth/CartContext';
import '@/global.css';
import { Outfit_400Regular } from '@expo-google-fonts/outfit';
import { Prata_400Regular } from '@expo-google-fonts/prata';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Prata_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#fff',
              paddingTop: 60,
            },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="Auth"
            options={{
              contentStyle: {
                backgroundColor: '#fff',
                paddingTop: 60,
                paddingHorizontal: 20, // khusus Auth page
              },
            }}
          />
          <Stack.Screen name="[...missing]" />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
