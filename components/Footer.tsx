import { Image, StyleSheet, Text, View } from 'react-native';
const LogoIcon = require('@/assets/frontend_assets/logo.png');

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      {/* Top Section */}
      <View style={styles.topRowFooter}>
        <View style={styles.mainContentFooter}>
          <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />

          <Text style={[styles.descFooter, styles.fontOutfit]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos; standard dummy text ever since the 1500s.</Text>
        </View>

        {/* Company */}
        <View style={styles.column}>
          <Text style={[styles.heading, styles.fontOutfit]}>COMPANY</Text>
          <Text style={[styles.item, styles.fontOutfit]}>Home</Text>
          <Text style={[styles.item, styles.fontOutfit]}>About us</Text>
          <Text style={[styles.item, styles.fontOutfit]}>Delivery</Text>
          <Text style={[styles.item, styles.fontOutfit]}>Privacy policy</Text>
        </View>

        {/* Get In Touch */}
        <View style={styles.column}>
          <Text style={[styles.heading, styles.fontOutfit]}>GET IN TOUCH</Text>
          <Text style={[styles.item, styles.fontOutfit]}>+62-000-000-0000</Text>
          <Text style={[styles.item, styles.fontOutfit]}>anonymous@gmail.com</Text>
          <Text style={[styles.item, styles.fontOutfit]}>Instagram</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fontOutfit: {
    fontFamily: 'Outfit_400Regular',
  },
  footerContainer: {
    paddingTop: 50,
  },
  topRowFooter: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  mainContentFooter: {
    width: '100%',
  },
  logo: {
    width: 140,
    height: 50,
    marginBottom: 15,
  },
  descFooter: {
    fontSize: 14,
    color: '#595959',
    lineHeight: 20,
  },
  column: {
    width: '48%',
    marginTop: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  item: {
    color: '#595959',
    fontSize: 14,
    marginBottom: 4,
  },
});
