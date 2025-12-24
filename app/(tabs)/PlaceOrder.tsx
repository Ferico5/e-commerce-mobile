import { useAuth } from '@/auth/AuthContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TitleBox from '@/components/TitleBox';
import axios from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

export default function PlaceOrder() {
  type CartItemProps = {
    productId: string;
    price: number;
    quantity: number;
    size?: string;
  };

  const { user, authReady } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);

  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (!authReady || !user) return;

    axios
      .get('/get-cart')
      .then((response) => {
        const cartItems: CartItemProps[] = response.data.cartItems || [];

        let sub = 0;
        cartItems.forEach((item) => {
          const quantity = item.quantity || 1;
          sub += item.price * quantity;
        });

        const shipping = Math.ceil(sub * 0.1);
        const total = sub + shipping;

        setSubtotal(sub);
        setShippingFee(shipping);
        setTotal(total);
        setCartItems(cartItems);
      })
      .catch((error) => {
        console.error('Error fetching cart for totals:', error);
      });
  }, [authReady, user]);

  // const handlePlaceOrder = async () => {
  //   if (loading) return;
  //   setLoading(true);
  //   try {
  //     if (!name || !email || !street || !city || !state || !zipcode || !country || !phone) {
  //       toast.error('Please fill in all delivery information.');
  //       return;
  //     }

  //     const response = await axios.post('/create-order', {
  //       userId: user._id,
  //       items: cartItems,
  //       paymentMethod: 'bca',
  //       street,
  //       city,
  //       state,
  //       zipcode,
  //       country,
  //       phone,
  //     });

  //     if (response.data.success) {
  //       const redirectUrl = response.data.redirect_url;
  //       window.location.href = redirectUrl;
  //     } else {
  //       toast.error('Failed to place order: ' + response.data.message);
  //     }
  //   } catch (err) {
  //     console.error('Failed to place order:', err);
  //     toast.error('Failed to place order.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

        {/* <Pressable onPress={() => router.push('/PlaceOrder')} disabled={cart.length === 0} className={`px-6 py-3 mt-5 self-end ${cart.length === 0 ? 'bg-gray-400' : 'bg-black'}`}>
          <Text className="font-outfit text-white">PROCEED TO CHECKOUT</Text>
        </Pressable> */}
      </View>

      <Footer />
    </ScrollView>
  );
}
