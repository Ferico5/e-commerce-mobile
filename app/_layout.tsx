import "@/global.css";
import { Outfit_400Regular } from "@expo-google-fonts/outfit";
import { Prata_400Regular } from "@expo-google-fonts/prata";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Provider } from "./Provider";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Prata_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#fff",
            paddingTop: 60,
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="Auth"
          options={{
            contentStyle: {
              backgroundColor: "#fff",
              paddingTop: 60,
              paddingHorizontal: 20, // khusus Auth page
            },
          }}
        />
        <Stack.Screen name="[...missing]" />
      </Stack>
    </QueryClientProvider>
  );
}
