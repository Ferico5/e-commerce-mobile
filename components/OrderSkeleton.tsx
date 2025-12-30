import { View } from 'react-native';

const OrderSkeleton = () => {
  return (
    <View className="flex-row w-full border-b border-t border-[#E5E7EB] py-5">
      {/* image skeleton */}
      <View className="w-[88px] h-[160px] mr-3 rounded bg-gray-200" />

      {/* content skeleton */}
      <View className="flex-1">
        <View className="h-5 w-[70%] bg-gray-200 rounded mb-2" />
        <View className="h-4 w-[40%] bg-gray-200 rounded mb-1" />
        <View className="h-4 w-[30%] bg-gray-200 rounded mb-1" />
        <View className="h-4 w-[50%] bg-gray-200 rounded mb-3" />

        <View className="flex-row justify-between w-[85%]">
          <View className="h-4 w-[20%] bg-gray-200 rounded" />
          <View className="h-8 w-[35%] bg-gray-200 rounded" />
        </View>
      </View>
    </View>
  );
};

export default OrderSkeleton;
