import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ScrollView, Text, View } from 'react-native';

export default function collection() {
  return (
    <ScrollView className='flex'>
      <Header />
      <Text>Collection Page</Text>
      <Footer />
    </ScrollView>
  );
}