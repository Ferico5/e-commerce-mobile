import { useAuth } from '@/context/AuthContext';
import { useFetchCart } from '@/features/cart/hooks';
import { calculateCartTotals } from '@/features/cart/utils';
import { useCreateOrder } from '@/features/order/hooks';
import { OrderFormValues, orderSchema } from '@/features/order/schema';
import { PaymentMethod } from '@/features/order/types';
import Footer from '@/shared/components/Footer';
import Header from '@/shared/components/Header';
import TitleBox from '@/shared/components/TitleBox';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function PlaceOrder() {
  const { user, authReady } = useAuth();

  const { data: cart = [] } = useFetchCart(authReady && !!user);
  const createOrderMutation = useCreateOrder();

  const name = user?.name ?? '';
  const email = user?.email ?? '';

  const [form, setForm] = useState<OrderFormValues>({
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bca');

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormValues, string>>>({});

  const updateField = <K extends keyof OrderFormValues>(key: K, value: OrderFormValues[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const { subtotal, shippingFee, total } = useMemo(() => calculateCartTotals(cart, {}), [cart]);

  const handlePlaceOrder = () => {
    if (!user) {
      Alert.alert('Please login first');
      return;
    }

    const parsed = orderSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof OrderFormValues, string>> = {};

      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof OrderFormValues;
        fieldErrors[key] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    createOrderMutation.mutate({
      userId: user._id,
      items: cart,
      paymentMethod,
      ...parsed.data,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />

      <View className="mt-10 mb-5 self-start">
        <TitleBox first="DELIVERY" second="INFORMATION" size="big" />
      </View>

      <TextInput value={name} className="w-full h-12 px-3 rounded-md border border-[#D1D5DB] mb-4 font-outfit" editable={false} selectTextOnFocus={false} />

      <TextInput value={email} className="w-full h-12 px-3 rounded-md border border-[#D1D5DB] mb-4 font-outfit" editable={false} selectTextOnFocus={false} />

      <TextInput
        value={form.street}
        onChangeText={(v) => updateField('street', v)}
        placeholder="Street"
        placeholderTextColor="#9CA3AF"
        className={`w-full h-12 px-3 rounded-md border border-[#D1D5DB] ${errors.street ? 'mb-2' : 'mb-4'} font-outfit`}
      />
      {errors.street && <Text className="text-red-500 text-sm mb-2 ml-3 font-outfit">{errors.street}</Text>}

      <View className="flex-row gap-3">
        <View className="flex-1">
          <TextInput value={form.city} onChangeText={(v) => updateField('city', v)} placeholder="City" placeholderTextColor="#9CA3AF" className={`h-12 px-3 rounded-md border border-[#D1D5DB] ${errors.city ? 'mb-2' : 'mb-4'} font-outfit`} />
          {errors.city && <Text className="text-red-500 text-sm mb-2 ml-3 font-outfit">{errors.city}</Text>}
        </View>
        <View className="flex-1">
          <TextInput
            value={form.state}
            onChangeText={(v) => updateField('state', v)}
            placeholder="State"
            placeholderTextColor="#9CA3AF"
            className={`h-12 px-3 rounded-md border border-[#D1D5DB] ${errors.state ? 'mb-2' : 'mb-4'} font-outfit`}
          />
          {errors.state && <Text className="text-red-500 text-sm mb-2 ml-3 font-outfit">{errors.state}</Text>}
        </View>
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <TextInput
            keyboardType="number-pad"
            autoComplete="off"
            value={form.zipcode}
            onChangeText={(v) => updateField('zipcode', v)}
            placeholder="Zipcode"
            placeholderTextColor="#9CA3AF"
            className={`h-12 px-3 rounded-md border border-[#D1D5DB] ${errors.zipcode ? 'mb-2' : 'mb-4'} font-outfit`}
          />
          {errors.zipcode && <Text className="text-red-500 text-sm mb-2 ml-3 font-outfit">{errors.zipcode}</Text>}
        </View>
        <View className="flex-1">
          <TextInput
            value={form.country}
            onChangeText={(v) => updateField('country', v)}
            placeholder="Country"
            placeholderTextColor="#9CA3AF"
            className={`h-12 px-3 rounded-md border border-[#D1D5DB] ${errors.country ? 'mb-2' : 'mb-4'} font-outfit`}
          />
          {errors.country && <Text className="text-red-500 text-sm mb-2 ml-3 font-outfit">{errors.country}</Text>}
        </View>
      </View>

      <TextInput
        keyboardType="number-pad"
        value={form.phone}
        onChangeText={(v) => updateField('phone', v)}
        placeholder="Phone"
        placeholderTextColor="#9CA3AF"
        className={`w-full h-12 px-3 rounded-md border border-[#D1D5DB] ${errors.phone ? 'mb-2' : 'mb-4'} font-outfit`}
      />
      {errors.phone && <Text className="text-red-500 text-sm mb-2 ml-3 font-outfit">{errors.phone}</Text>}

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

        <Pressable onPress={handlePlaceOrder} disabled={cart.length === 0 || createOrderMutation.isPending} className={`px-6 py-3 mt-5 self-end ${cart.length === 0 || createOrderMutation.isPending ? 'bg-gray-400' : 'bg-black'}`}>
          <Text className="font-outfit text-white">{createOrderMutation.isPending ? 'PROCESSING...' : 'PLACE ORDER'}</Text>
        </Pressable>
      </View>

      <Footer />
    </ScrollView>
  );
}
