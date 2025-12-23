import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ScrollView, Text } from 'react-native';

export default function PlaceOrder() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />

      <Text>Place Order Page</Text>
      <Footer />
    </ScrollView>
  );
}
