import { Image, Text, View } from 'react-native';

type ProductBoxProps = {
  id: string;
  image: string;
  name: string;
  price: number;
};

export default function ProductBox({ id, image, name, price }: ProductBoxProps) {
  return (
    <View className="w-[48%] mb-[25]">
      <Image source={{ uri: image }} className="w-full h-[200] mb-[15]" resizeMode="cover" />
      <Text className="font-outfit h-[40] overflow-hidden" numberOfLines={2} ellipsizeMode="tail">
        {name}
      </Text>
      <Text className="font-outfit mt-[5]">Rp. {price}</Text>
    </View>
  );
}
