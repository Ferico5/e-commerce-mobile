import { useAuth } from '@/auth/AuthContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TitleBox from '@/components/TitleBox';
import { fetchCart } from '@/queries/cart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { createOrder } from '@/queries/order';

export default function PlaceOrder() {
  const { user, authReady } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const { data: cart = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: authReady && !!user,
  });

  const { subtotal, shippingFee, total } = useMemo(() => {
    let sub = 0;

    cart.forEach((item) => {
      const qty = item.quantity || 1;
      sub += item.price * qty;
    });

    const shipping = Math.ceil(sub * 0.1);

    return {
      subtotal: sub,
      shippingFee: shipping,
      total: sub + shipping,
    };
  }, [cart]);

  const placeOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async (data) => {
      console.log('Order response:', data);
      try {
        if (!data?.redirect_url) {
          Alert.alert('Redirect URL not found');
          return;
        }

        queryClient.invalidateQueries({ queryKey: ['cart'] });

        console.log('Opening payment URL:', data.redirect_url);

        await Linking.openURL(data.redirect_url);
      } catch (err) {
        console.error('Linking error:', err);
        Alert.alert('Failed to open payment page');
      }
    },
    onError: (error: any) => {
      console.error('Create order error:', error);
      Alert.alert('Order failed');
    },
  });

  const handlePlaceOrder = async () => {
    if (!user) {
      Alert.alert('Please login first');
      return;
    }

    if (!name || !email || !street || !city || !state || !zipcode || !country || !phone) {
      Alert.alert('Please fill in all delivery information.');
      return;
    }

    placeOrderMutation.mutate({
      userId: user._id,
      items: cart,
      paymentMethod: 'bca',
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />

      <View className="mt-10 mb-5 self-start">
        <TitleBox first="DELIVERY" second="INFORMATION" size="big" />
      </View>

      <TextInput value={name} onChangeText={setName} className="w-full h-12 px-3 rounded-md border border-[#D1D5DB] mb-4 font-outfit" editable={false} selectTextOnFocus={false} />

      <TextInput value={email} onChangeText={setEmail} className="w-full h-12 px-3 rounded-md border border-[#D1D5DB] mb-4 font-outfit" editable={false} selectTextOnFocus={false} />

      <TextInput value={street} onChangeText={setStreet} placeholder="Street" placeholderTextColor="#9CA3AF" className="w-full h-12 px-3 rounded-md border border-[#D1D5DB] mb-4 font-outfit" />

      <View className="flex-row gap-3">
        <TextInput value={city} onChangeText={setCity} placeholder="City" placeholderTextColor="#9CA3AF" className="flex-1 h-12 px-3 rounded-md border border-[#D1D5DB] mb-4 font-outfit" />
        <TextInput value={state} onChangeText={setState} placeholder="State" placeholderTextColor="#9CA3AF" className="flex-1 h-12 px-3 rounded-md border border-[#D1D5DB] mb-4 font-outfit" />
      </View>

      <View className="flex-row gap-3">
        <TextInput
          keyboardType="number-pad"
          autoComplete="off"
          value={zipcode}
          onChangeText={setZipcode}
          placeholder="Zipcode"
          placeholderTextColor="#9CA3AF"
          className="flex-1 h-12 px-3 rounded-md border border-[#D1D5DB] mb-4 font-outfit"
        />
        <TextInput value={country} onChangeText={setCountry} placeholder="Country" placeholderTextColor="#9CA3AF" className="flex-1 h-12 px-3 rounded-md border border-[#D1D5DB] mb-4 font-outfit" />
      </View>

      <TextInput keyboardType="number-pad" value={phone} onChangeText={setPhone} placeholder="Phone" placeholderTextColor="#9CA3AF" className="w-full h-12 px-3 rounded-md border border-[#D1D5DB] mb-4 font-outfit" />

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

        <Pressable onPress={handlePlaceOrder} disabled={cart.length === 0 || placeOrderMutation.isPending} className={`px-6 py-3 mt-5 self-end ${cart.length === 0 || placeOrderMutation.isPending ? 'bg-gray-400' : 'bg-black'}`}>
          <Text className="font-outfit text-white">{placeOrderMutation.isPending ? 'PROCESSING...' : 'PLACE ORDER'}</Text>
        </Pressable>
      </View>

      <Footer />
    </ScrollView>
  );
}
