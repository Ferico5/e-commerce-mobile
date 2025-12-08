import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ScrollView, Text, View } from 'react-native';

export default function contact() {
  return (
    <ScrollView className='flex'>
      <Header />
      <Text>Contact Page</Text>
      <Footer />
    </ScrollView>
  );
}