import { Image, StyleSheet, Text, View } from 'react-native';

type WhyUsProps = {
  image: any;
  title: string;
  text: string;
};

export default function WhyUs({image, title, text} : WhyUsProps) {
  return (
    <View style={styles.whyPart}>
      {/* Image */}
      <Image source={image} style={styles.whyPicture} />

      {/* Title */}
      <Text style={[styles.fontOutfit, styles.fontBold, styles.whyTitle]}>{title}</Text>

      {/* Text */}
      <Text style={styles.whyText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  whyPart: {
    display: 'flex',
    alignItems: 'center',
  },
  whyPicture: {
    width: '13%',
    resizeMode: 'contain',
  },
  whyTitle: {
    color: '#364153',
    fontSize: 17,
    marginBottom: 7,
  },
  whyText: {
    color: '#6A7282',
  },
  fontBold: {
    fontWeight: 'bold',
  },
  fontOutfit: {
    fontFamily: 'Outfit_400Regular',
  },
});
