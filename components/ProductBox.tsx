import { Image, StyleSheet, Text, View } from 'react-native';

type ProductBoxProps = {
  id: string;
  image: string;
  name: string;
  price: number;
};

export default function ProductBox({ id, image, name, price }: ProductBoxProps) {
  return (
    <View style={styles.productContainer}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <Text style={[styles.fontOutfit, styles.productText]} numberOfLines={2} ellipsizeMode="tail">
        {name}
      </Text>
      <Text style={[styles.fontOutfit, styles.productTextPrice]}>Rp. {price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // small utils
  fontOutfit: {
    fontFamily: 'Outfit_400Regular',
  },
  fontPrata: {
    fontFamily: 'Prata_400Regular',
  },

  // big utils
  productContainer: {
    width: '48%',
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  productText: {
    height: 40,
    overflow: 'hidden',
  },
  productTextPrice: {
    marginTop: 5,
  },
});
