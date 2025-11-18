import { StyleSheet, Text, View } from 'react-native';

export default function about() {
  return (
    <View style={styles.container}>
      <Text>About Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
