import { View, Image } from "react-native";
const LogoIcon = require('@/assets/frontend_assets/logo.png');
const searchIcon = require('@/assets/frontend_assets/search_icon.png');
const profileIcon = require('@/assets/frontend_assets/profile_icon.png');
const cartIcon = require('@/assets/frontend_assets/cart_icon.png');

export default function Header() {
  return (
    <View className="justify-between items-center flex-row">
      {/* Image */}
      <Image source={LogoIcon} className="w-[35%]" resizeMode="contain" />

      {/* Icon */}
      <View className="flex-row w-[35%] justify-between">
        <Image source={searchIcon} className="w-7 h-7" resizeMode="contain" />
        <Image source={profileIcon} className="w-7 h-7" resizeMode="contain" />
        <Image source={cartIcon} className="w-7 h-7" resizeMode="contain" />
      </View>
    </View>
  );
}
