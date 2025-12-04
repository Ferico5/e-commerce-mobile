import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SubscribeBox() {
  return (
    <View style={styles.subscribeContainer}>
      <Text style={styles.subscribeTitle}>Subscribe now & get 20% off</Text>
      <Text style={styles.subscribeSubTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
      <View style={styles.inputRow}>
        <TextInput placeholder="Enter your email" autoComplete="off" style={styles.input} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SUBSCRIBE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subscribeContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeTitle: {
    color: '#1E2939',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 10,
  },
  subscribeSubTitle: {
    color: '#9CA3AF',
    textAlign: 'center',
  },
  inputRow: {
    marginTop: 18,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '70%',
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#000',
    height: 44,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
