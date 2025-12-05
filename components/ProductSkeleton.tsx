import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';

export default function ProductSkeleton() {
  return (
    <View className="w-[48%] mb-[20]">
      <Skeleton colorMode="light" height={200} width={'100%'} radius={8} />

      <View className="mt-[10]">
        <Skeleton colorMode="light" height={15} width={'80%'} radius={4} />
      </View>

      <View className="mt-[10]">
        <Skeleton colorMode="light" height={15} width={'50%'} radius={4} />
      </View>
    </View>
  );
}
