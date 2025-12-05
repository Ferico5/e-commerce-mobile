import Footer from '@/components/Footer';
import { ScrollView, Text, View } from 'react-native';

export default function collection() {
  return (
    <ScrollView className='flex'>
      <Text>Collection Page</Text>
      <Footer />
    </ScrollView>
  );
}