import { useCart } from '@/auth/CartContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TitleBox from '@/components/TitleBox';
import axios from '@/utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const binIcon = require('@/assets/frontend_assets/bin_icon.png');

const Cart = () => {
  type CartItem = {
    _id: string;
    productId: string;
    image: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
  };

  type QuantityMap = {
    [key: string]: number;
  };

  const [cart, setCart] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [quantityMap, setQuantityMap] = useState<QuantityMap>({});
  const debounceTimeout = useRef<Record<string, NodeJS.Timeout | number>>({});
  const { fetchCartCount } = useCart();
  const [inputMap, setInputMap] = useState<Record<string, string>>({}); // for allow typing qty
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  const calculateTotals = (cartItems: CartItem[], qtyMap: QuantityMap) => {
    let sub = 0;

    cartItems.forEach((item: CartItem) => {
      const key = `${item.productId}_${item.size}`;
      const quantity = qtyMap[key] || item.quantity || 1;
      sub += item.price * quantity;
    });

    const shipping = Math.ceil(sub * 0.1);
    const total = sub + shipping;

    setSubtotal(sub);
    setShippingFee(shipping);
    setTotal(total);
  };

  const fetchCart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('/get-cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cartArray = res.data.cartItems || [];
      setCart(cartArray);

      const newQuantityMap: QuantityMap = {};
      cartArray.forEach((item: CartItem) => {
        const key = `${item.productId}_${item.size}`;
        newQuantityMap[key] = item.quantity;
      });

      setQuantityMap(newQuantityMap);
      calculateTotals(cartArray, newQuantityMap);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  useEffect(() => {
    if (cart.length > 0) {
      calculateTotals(cart, quantityMap);
    }
  }, [quantityMap]);

  // const handleQuantityChange = (productId: string, size: string, newQty: number) => {
  //   if (newQty < 1) return;

  //   const key = `${productId}_${size}`;

  //   setQuantityMap((prev) => ({
  //     ...prev,
  //     [key]: newQty,
  //   }));

  //   clearTimeout(debounceTimeout.current[key]);
  //   debounceTimeout.current[key] = setTimeout(() => {
  //     axios
  //       .put(`/cart/${productId}`, { quantity: newQty, size })
  //       .then(() => {
  //         fetchCart();
  //         fetchCartCount();
  //       })
  //       .catch((err) => console.error('Error updating cart:', err));
  //   }, 600);
  // };

  const handleDelete = async (productId: string, size: string) => {
    const key = `${productId}_${size}`;

    try {
      setDeletingKey(key);

      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      await axios.delete(`/cart/${productId}?size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchCart();
      fetchCartCount();
    } catch (error) {
      console.error('Error deleting cart item:', error);
    } finally {
      setDeletingKey(null);
    }
  };

  return (
    <ScrollView>
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
            <Image source={{ uri: item.image[0] }} className="w-20 h-24" resizeMode="cover" />

            {/* detail */}
            <View className="flex flex-col justify-between h-24 w-[40%]">
              <Text className="font-outfit font-semibold">{item.name}</Text>
              <Text className="font-outfit">Rp {item.price}</Text>
              <Text className="font-outfit">{item.size}</Text>
            </View>

            {/* qty input */}
            <View className="flex items-center justify-center">
              <TextInput
                keyboardType="number-pad"
                value={inputMap[`${item.productId}_${item.size}`] ?? quantityMap[`${item.productId}_${item.size}`]?.toString() ?? '1'}
                className="w-12 border py-1 px-2 border-[#E5E7EB] text-center"
                onChangeText={(text) => {
                  // allow empty while typing
                  if (/^\d*$/.test(text)) {
                    setInputMap((prev) => ({
                      ...prev,
                      [`${item.productId}_${item.size}`]: text,
                    }));
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

      <Footer />
    </ScrollView>
  );
};

export default Cart;
