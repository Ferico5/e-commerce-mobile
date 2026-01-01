import { useAuth } from '@/context/AuthContext';
import { useDeleteCartItem, useFetchCart, useUpdateCartQty } from '@/features/cart/hooks';
import { calculateCartTotals } from '@/features/cart/utils';
import Footer from '@/shared/components/Footer';
import Header from '@/shared/components/Header';
import TitleBox from '@/shared/components/TitleBox';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import binIcon from '@/assets/frontend_assets/bin_icon.png';

type QuantityMap = Record<string, number>;
type InputMap = Record<string, string>;

export default function Cart() {
  const { user, authReady } = useAuth();

  const { data: cart = [] } = useFetchCart(authReady && !!user);
  const updateQtyMutation = useUpdateCartQty();
  const deleteMutation = useDeleteCartItem();

  const [quantityMap, setQuantityMap] = useState<QuantityMap>({});
  const debounceTimeout = useRef<Record<string, NodeJS.Timeout | number>>({});
  const [inputMap, setInputMap] = useState<InputMap>({});
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  useEffect(() => {
    const map: QuantityMap = {};
    cart.forEach((item) => {
      map[`${item.productId}_${item.size}`] = item.quantity;
    });
    setQuantityMap(map);
  }, [cart]);

  const handleQuantityChange = (productId: string, size: string, newQty: number) => {
    if (newQty < 1 || Number.isNaN(newQty)) return;

    const key = `${productId}_${size}`;

    setQuantityMap((prev) => ({
      ...prev,
      [key]: newQty,
    }));

    clearTimeout(debounceTimeout.current[key]);

    debounceTimeout.current[key] = setTimeout(() => {
      updateQtyMutation.mutate({ productId, size, quantity: newQty });
    }, 600);
  };

  const handleDelete = (productId: string, size: string) => {
    const key = `${productId}_${size}`;
    setDeletingKey(key);
    deleteMutation.mutate({ productId, size }, { onSettled: () => setDeletingKey(null) });
  };

  const { subtotal, shippingFee, total } = useMemo(() => calculateCartTotals(cart, quantityMap), [cart, quantityMap]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />

      <View className="mt-10 mb-5 self-start">
        <TitleBox first="YOUR" second="CART" size="big" />
      </View>

      {cart.length === 0 ? (
        <Text>Cart is Empty</Text>
      ) : (
        cart.map((item) => (
          <View key={`${item.productId}_${item.size}`} className="flex flex-row justify-between items-center border-b border-t border-[#E5E7EB] py-4">
            {/* image */}
            <Image source={{ uri: item.image[0] }} className="w-24 h-32" resizeMode="cover" />

            {/* detail */}
            <View className="flex flex-col justify-between h-32 w-[40%]">
              <Text className="font-outfit font-semibold">{item.name}</Text>
              <Text className="font-outfit">Rp {item.price}</Text>
              <Text className="font-outfit border border-[#E5E7EB] px-3 py-1 bg-[#F8FAFC] self-start">{item.size}</Text>
            </View>

            {/* qty input */}
            <View className="flex items-center justify-center">
              <TextInput
                keyboardType="number-pad"
                value={inputMap[`${item.productId}_${item.size}`] ?? quantityMap[`${item.productId}_${item.size}`]?.toString() ?? '1'}
                className="w-12 border py-1 px-2 border-[#E5E7EB] text-center"
                onChangeText={(text) => {
                  if (!/^\d*$/.test(text)) return;

                  const key = `${item.productId}_${item.size}`;

                  setInputMap((prev) => ({
                    ...prev,
                    [key]: text,
                  }));

                  const parsed = parseInt(text);
                  if (!isNaN(parsed)) {
                    handleQuantityChange(item.productId, item.size, parsed);
                  }
                }}
                onBlur={() => {
                  const key = `${item.productId}_${item.size}`;
                  const raw = inputMap[key];

                  let finalValue = Number(raw);

                  if (!raw || finalValue < 1) finalValue = 1;

                  setQuantityMap((prev) => ({
                    ...prev,
                    [key]: finalValue,
                  }));

                  setInputMap((prev) => {
                    const copy = { ...prev };
                    delete copy[key];
                    return copy;
                  });
                }}
              />
            </View>

            {/* trash icon */}
            <Pressable disabled={deletingKey === `${item.productId}_${item.size}`} onPress={() => handleDelete(item.productId, item.size)}>
              {deletingKey === `${item.productId}_${item.size}` ? <ActivityIndicator size="small" /> : <Image source={binIcon} className="w-5 h-5" />}
            </Pressable>
          </View>
        ))
      )}

      {/* cart checkout */}
      <View>
        <View className="mt-20 mb-5 self-start">
          <TitleBox first="CART" second="TOTALS" size="big" />
        </View>

        <View className="flex-row justify-between pb-2 mt-3 border-b border-[#E5E7EB]">
          <Text className="font-outfit">Subtotal</Text>
          <Text className="font-outfit">Rp {subtotal.toLocaleString('id-ID')}</Text>
        </View>
        <View className="flex-row justify-between pb-2 mt-3 border-b border-[#E5E7EB]">
          <Text className="font-outfit">Shipping Fee</Text>
          <Text className="font-outfit">Rp {shippingFee.toLocaleString('id-ID')}</Text>
        </View>
        <View className="flex-row justify-between pb-2 mt-3 border-b border-[#E5E7EB]">
          <Text className="font-outfit">Total</Text>
          <Text className="font-outfit">Rp {total.toLocaleString('id-ID')}</Text>
        </View>

        <Pressable onPress={() => router.push('/PlaceOrder')} disabled={cart.length === 0} className={`px-6 py-3 mt-5 self-end ${cart.length === 0 ? 'bg-gray-400' : 'bg-black'}`}>
          <Text className="font-outfit text-white">PROCEED TO CHECKOUT</Text>
        </Pressable>
      </View>

      <Footer />
    </ScrollView>
  );
}
