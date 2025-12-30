import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ScrollView, Text, View } from 'react-native';

export default function OrderDetail() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />
      <Text>Order Detail Page</Text>
      <Footer />
    </ScrollView>
  );
}