import { useAuth } from '@/auth/AuthContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import OrderSkeleton from '@/components/OrderSkeleton';
import TitleBox from '@/components/TitleBox';
import { fetchOrders } from '@/queries/order';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';

const PAGE_SIZE = 5;

export default function Order() {
  const { user } = useAuth();
  const userId = user?._id;

  const [page, setPage] = useState(1);

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => fetchOrders(userId!),
    enabled: !!userId,
  });

  if (isError) {
    Alert.alert('Failed to fetch orders');
  }

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [orders]);

  const visibleOrders = useMemo(() => {
    return sortedOrders.slice(0, page * PAGE_SIZE);
  }, [sortedOrders, page]);

  const hasMore = visibleOrders.length < sortedOrders.length;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={({ nativeEvent }) => {
        const isBottom = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20;

        if (isBottom && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      }}
      scrollEventThrottle={300}
    >
      <Header />

      <View className="mt-10 mb-5 self-start">
        <TitleBox first="MY" second="ORDERS" size="big" />
      </View>

      {isLoading ? (
        <>
          {[...Array(3)].map((_, i) => (
            <OrderSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
          {visibleOrders.map((order) => (
            <View key={order._id} className="flex-row w-full border-b border-t border-[#E5E7EB] py-5">
              {/* image */}
              <View className="relative w-[88px] h-[160px] mr-3">
                <Image source={{ uri: order.items[0].image[0] }} className="w-[80px] h-full rounded border border-gray-200 z-10 relative" resizeMode="cover" />
                {/* if product length > 1 */}
                {order.items.length > 1 && <Image source={{ uri: order.items[1].image[0] }} className="w-[80px] h-full rounded border border-gray-200 absolute top-2 left-2 z-0 opacity-80" resizeMode="cover" />}
              </View>

              {/* title product */}
              <View className="flex">
                <View className="flex-row items-center mb-2">
                  <Text className="font-outfit text-lg w-[75%]">{order.items[0].name}</Text>
                  {order.items.length > 1 && <Text className="bg-gray-200 text-xs px-2 py-1 rounded-full font-outfit">+{order.items.length - 1}</Text>}
                </View>

                <View className="flex gap-1 mb-1">
                  {/* price product */}
                  <Text className="font-outfit">Rp. {order.total_fee.toLocaleString()}</Text>
                  {/* items length or quantity */}
                  {order.items.length > 1 ? <Text className="font-outfit">Items: {order.items.length}</Text> : <Text className="font-outfit">Quantity: {order.items[0].quantity}</Text>}
                </View>

                {/* date */}
                <Text className="font-outfit text-sm mb-1">
                  Date: <Text className="font-outfit text-[#A2A9B4]">{new Date(order.date).toDateString()}</Text>
                </Text>

                {/* payment method */}
                <Text className="font-outfit text-sm mb-1">
                  Payment: <Text className="font-outfit text-[#A2A9B4]">Bank {order.paymentMethod.toUpperCase()}</Text>
                </Text>

                <View className="flex-row items-center justify-between w-[85%]">
                  {/* status */}
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 rounded-full mr-3 bg-green-500"></View>
                    <Text className="font-outfit">{order.status}</Text>
                  </View>

                  {/* button order detail */}
                  <View>
                    <Pressable onPress={() => router.push('/orderDetail')} className="border border-[#E5E7EB] px-4 py-2 self-start">
                      <Text className="font-outfit">Detail Order</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </>
      )}

      {/* loading more */}
      {hasMore && !isLoading && <OrderSkeleton />}

      <Footer />
    </ScrollView>
  );
}
