import Footer from '@/components/Footer';
import { ScrollView, Text, View } from 'react-native';

export default function contact() {
  return (
    <ScrollView className='flex'>
      <Text>Contact Page</Text>
      <Footer />
    </ScrollView>
  );
}