import { StyleSheet, Text, View, TextStyle } from 'react-native';

type TitleBoxProps = {
  first: string;
  second: string;
  size?: 'big' | 'small';
};

export default function TitleBox({ first, second, size = 'small' }: TitleBoxProps) {
  let textStyle: TextStyle = styles.smallText;

  if (size === 'big') {
    textStyle = styles.bigText;
  }

  return (
    <View style={[styles.container, size === 'big' ? styles.big : styles.small]}>
      <Text style={textStyle}>
        {first} <Text style={styles.second}>{second}</Text>
      </Text>

      {/* horizontal line */}
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  // sizes
  big: {
    marginBottom: 8,
  },
  small: {
    marginBottom: 10,
  },

  // text sizes
  bigText: {
    fontSize: 24, // sm:text-2xl → 24px
    fontWeight: '500',
    color: '#707070',
    fontFamily: 'Outfit_400Regular',
  },
  smallText: {
    fontSize: 18, // md:text-xl
    fontWeight: '500',
    color: '#707070',
    fontFamily: 'Outfit_400Regular',
  },

  // second word
  second: {
    color: '#171717',
    fontWeight: '600',
    fontFamily: 'Outfit_400Regular',
  },

  // horizontal line
  line: {
    width: 48, // w-12
    height: 2,
    backgroundColor: '#171717',
  },
});
