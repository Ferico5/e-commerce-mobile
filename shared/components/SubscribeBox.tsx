import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SubscribeBox() {
  return (
    <View className="w-full p-[20] items-center justify-center">
      <Text className="font-outfit text-[#1E2939] font-bold text-center text-2xl mb-[10]">Subscribe now & get 20% off</Text>
      <Text className="font-outfit text-[#9CA3AF] text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
      <View className="mt-[18] w-full flex-row items-center justify-center">
        <TextInput placeholder="Enter your email" autoComplete="off" className="w-[70%] h-[44] border border-[#D1D5DB] px-[12]" />

        <TouchableOpacity className="bg-black h-[44] px-[18] items-center justify-center">
          <Text className="font-outfit text-white text-sm font-bold">SUBSCRIBE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
