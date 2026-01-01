import LogoIcon from '@/assets/frontend_assets/logo.png';
import { Image, Text, View } from 'react-native';

export default function Footer() {
  return (
    <View className="pt-[50]">
      {/* Top Section */}
      <View className="mb-[15]">
        <View className="w-full">
          <Image source={LogoIcon} className="w-[140] h-[50] mb-[15]" resizeMode="contain" />

          <Text className="font-outfit text-[#595959]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos; standard dummy text ever since the 1500s.</Text>
        </View>

        {/* Company */}
        <View className="w-[48%] mt-[30]">
          <Text className="font-outfit text-2xl font-bold mb-[15]">COMPANY</Text>
          <Text className="font-outfit text-[#595959] mb-[4]">Home</Text>
          <Text className="font-outfit text-[#595959] mb-[4]">About us</Text>
          <Text className="font-outfit text-[#595959] mb-[4]">Delivery</Text>
          <Text className="font-outfit text-[#595959] mb-[4]">Privacy policy</Text>
        </View>

        {/* Get In Touch */}
        <View className="w-[48%] mt-[30]">
          <Text className="font-outfit text-2xl font-bold mb-[15]">GET IN TOUCH</Text>
          <Text className="font-outfit text-[#595959] mb-[4]">+62-000-000-0000</Text>
          <Text className="font-outfit text-[#595959] mb-[4]">anonymous@gmail.com</Text>
          <Text className="font-outfit text-[#595959] mb-[4]">Instagram</Text>
        </View>
      </View>
    </View>
  );
}
