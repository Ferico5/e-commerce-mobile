import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';

export default function ProductDetailSkeleton() {
  return (
    <View className="p-4">
      {/* Main Image */}
      <Skeleton height={450} width={'100%'} radius={8} colorMode="light" />

      {/* Thumbnail Row */}
      <View className="flex-row gap-3 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height={100} width={80} radius={8} colorMode="light" />
        ))}
      </View>

      {/* Title */}
      <View className="mt-6">
        <Skeleton height={25} width={'70%'} radius={6} colorMode="light" />
      </View>

      {/* Rating */}
      <View className="flex-row gap-2 mt-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={20} width={20} radius={4} colorMode="light" />
        ))}
        <Skeleton height={20} width={40} radius={4} colorMode="light" />
      </View>

      {/* Price */}
      <View className="mt-4">
        <Skeleton height={22} width={'40%'} radius={4} colorMode="light" />
      </View>

      {/* Description */}
      <View className="mt-6">
        <Skeleton height={15} width={'100%'} radius={4} colorMode="light" />

        <View style={{ marginTop: 8 }}>
          <Skeleton height={15} width={'85%'} radius={4} colorMode="light" />
        </View>
      </View>

      {/* Size options */}
      <View className="mt-8 flex-row gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={40} width={60} radius={6} colorMode="light" />
        ))}
      </View>

      {/* Add to Cart */}
      <View className="mt-9">
        <Skeleton height={45} width={150} radius={6} colorMode="light" />
      </View>
    </View>
  );
}
