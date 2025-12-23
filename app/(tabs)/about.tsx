import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ScrollView, Text, View } from 'react-native';

export default function about() {
  return (
    <ScrollView className='flex' showsVerticalScrollIndicator={false}>
      <Header />
      <Text>About Page</Text>
      <Footer />
    </ScrollView>
  );
}