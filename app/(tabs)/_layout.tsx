import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 65,
        },
        sceneStyle: {
          backgroundColor: '#fff',
          paddingHorizontal: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={24} />,
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'cart-sharp' : 'cart-outline'} size={24} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'information-circle-sharp' : 'information-circle-outline'} size={24} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'call-sharp' : 'call-outline'} size={24} />,
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          tabBarItemStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
