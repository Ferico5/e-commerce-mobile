import Footer from '@/components/Footer';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function collection() {
  return (
    <ScrollView style={styles.container}>
      <Text>Collection Page</Text>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
