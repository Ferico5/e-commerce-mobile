import { Stack } from 'expo-router';

export default function ProductLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: '#fff',
          paddingTop: 60,
          paddingHorizontal: 20,
        },
      }}
    >
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
