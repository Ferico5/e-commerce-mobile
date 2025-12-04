import Footer from '@/components/Footer';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function about() {
  return (
    <ScrollView style={styles.container}>
      <Text>About Page</Text>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
