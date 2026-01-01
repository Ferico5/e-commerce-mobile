import { Image, Text, View } from 'react-native';

type WhyUsProps = {
  image: any;
  title: string;
  text: string;
};

export default function WhyUs({ image, title, text }: WhyUsProps) {
  return (
    <View className="flex items-center">
      {/* Image */}
      <Image source={image} className="w-[13%]" resizeMode="contain" />

      {/* Title */}
      <Text className="font-outfit font-bold text-[#364153] text-xl mb-[7]">{title}</Text>

      {/* Text */}
      <Text className="font-outfit text-[#6A7282]">{text}</Text>
    </View>
  );
}
