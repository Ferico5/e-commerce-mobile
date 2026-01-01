import Footer from '@/shared/components/Footer';
import Header from '@/shared/components/Header';
import { ScrollView, Text } from 'react-native';

export default function about() {
  return (
    <ScrollView className="flex" showsVerticalScrollIndicator={false}>
      <Header />
      <Text>About Page</Text>
      <Footer />
    </ScrollView>
  );
}
