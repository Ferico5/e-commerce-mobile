import { Text, View } from 'react-native';

type TitleBoxProps = {
  first: string;
  second: string;
  size?: 'big' | 'small';
};

export default function TitleBox({ first, second, size = 'small' }: TitleBoxProps) {
  const isBig = size === 'big';

  return (
    <View className={`flex-row items-center justify-center gap-2 ${isBig ? 'mb-2' : 'mb-3'}`}>
      <Text className={`${isBig ? 'text-2xl' : 'text-xl'} font-medium text-[#707070] font-outfit`}>
        {first} <Text className="text-[#171717] font-semibold font-outfit">{second}</Text>
      </Text>

      <View className="w-12 h-0.5 bg-[#171717]" />
    </View>
  );
}
