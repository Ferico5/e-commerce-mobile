import Footer from '@/components/Footer';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function contact() {
  return (
    <ScrollView style={styles.container}>
      <Text>Contact Page</Text>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
