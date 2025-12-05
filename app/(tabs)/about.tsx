import Footer from '@/components/Footer';
import { ScrollView, Text, View } from 'react-native';

export default function about() {
  return (
    <ScrollView className='flex'>
      <Text>About Page</Text>
      <Footer />
    </ScrollView>
  );
}