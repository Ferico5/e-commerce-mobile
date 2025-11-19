import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import TitleBox from '@/components/TitleBox';
const LogoIcon = require('@/assets/frontend_assets/logo.png');
const searchIcon = require('@/assets/frontend_assets/search_icon.png');
const profileIcon = require('@/assets/frontend_assets/profile_icon.png');
const cartIcon = require('@/assets/frontend_assets/cart_icon.png');
const heroImage = require('@/assets/frontend_assets/hero_img.png');

export default function index() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* header */}
      <View style={styles.header}>
        {/* Image */}
        <Image source={LogoIcon} style={styles.logoIcon} />

        {/* Icon */}
        <View style={styles.iconContainer}>
          <Image source={searchIcon} style={styles.icon} />
          <Image source={profileIcon} style={styles.icon} />
          <Image source={cartIcon} style={styles.icon} />
        </View>
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        {/* Text Hero */}
        <View style={styles.heroText}>
          <Text style={[styles.defaultFont, styles.fontBold]}>OUR BESTSELLERS</Text>
          <Text style={[styles.secondaryFont, styles.textSize]}>Latest Arrivals</Text>
          <Text style={[styles.defaultFont, styles.fontBold]}>SHOP NOW</Text>
        </View>

        {/* Image Hero */}
        <Image source={heroImage} style={styles.heroImage} />
      </View>

      {/* Latest Collection */}
      <TitleBox first='LATEST' second='COLLECTION' />
      <Text style={[styles.defaultFont, styles.textAlignCenter]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
  header: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoIcon: {
    width: '35%',
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'space-between',
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  hero: {
    marginTop: 20,
    flexDirection: 'column',
    height: 390,
    justifyContent: 'space-between',
    borderWidth: 1,
    marginBottom: 40,
  },
  heroText: {
    width: '50%',
    left: '30%',
    marginTop: 30,
    gap: 3,
  },
  defaultFont: {
    fontFamily: 'Outfit_400Regular',
  },
  secondaryFont: {
    fontFamily: 'Prata_400Regular',
  },
  fontBold: {
    fontWeight: 'bold',
  },
  textSize: {
    fontSize: 22,
  },
  heroImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    marginTop: 30,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
});
