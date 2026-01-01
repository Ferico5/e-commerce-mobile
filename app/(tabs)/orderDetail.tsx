import Footer from '@/shared/components/Footer';
import Header from '@/shared/components/Header';
import { ScrollView, Text } from 'react-native';

export default function OrderDetail() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />
      <Text>Order Detail Page</Text>
      <Footer />
    </ScrollView>
  );
}
