import ProductBox from '@/components/ProductBox';
import ProductSkeleton from '@/components/ProductSkeleton';
import SubscribeBox from '@/components/SubscribeBox';
import TitleBox from '@/components/TitleBox';
import WhyUs from '@/components/WhyUs';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from '../../utils/axiosInstance';
import Footer from '@/components/Footer';

const LogoIcon = require('@/assets/frontend_assets/logo.png');
const searchIcon = require('@/assets/frontend_assets/search_icon.png');
const profileIcon = require('@/assets/frontend_assets/profile_icon.png');
const cartIcon = require('@/assets/frontend_assets/cart_icon.png');
const heroImage = require('@/assets/frontend_assets/hero_img.png');
const exchangeIcon = require('@/assets/frontend_assets/exchange_icon.png');
const qualityIcon = require('@/assets/frontend_assets/quality_icon.png');
const supportIcon = require('@/assets/frontend_assets/support_img.png');

export default function Index() {
  interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    bestSeller: boolean;
    date: string;
    __v?: number;
  }

  const [lastCollectionList, setLastCollectionList] = useState<Product[]>([]);
  const [bestSellerList, setBestSellerList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await axios.get('/list');
        const data = res.data;

        if (data.listProduct) {
          const sorted = [...data.listProduct].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setLastCollectionList(sorted.slice(0, 10));
        }
      } catch (error) {
        console.log('Error fetching products:', error);
        Alert.alert('Error', 'Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get('/list');
        const data = res.data;

        if (data.listProduct) {
          const bestSeller = data.listProduct
            .filter((item: Product) => item.bestSeller === true)
            .sort((a: Product, b: Product) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
          setBestSellerList(bestSeller);
        }
      } catch (error) {
        console.log('Error fetching products:', error);
        Alert.alert('Error', 'Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

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
          <Text style={[styles.fontOutfit, styles.fontBold]}>OUR BESTSELLERS</Text>
          <Text style={[styles.fontPrata, styles.textSize]}>Latest Arrivals</Text>
          <Text style={[styles.fontOutfit, styles.fontBold]}>SHOP NOW</Text>
        </View>

        {/* Image Hero */}
        <Image source={heroImage} style={styles.heroImage} />
      </View>

      {/* Latest Collection */}
      <TitleBox first="LATEST" second="COLLECTION" />
      <Text style={[styles.fontOutfit, styles.textAlignCenter]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</Text>

      {/* Product List */}
      <View style={styles.mainProductContainer}>
        {isLoading ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </View>
        ) : (
          lastCollectionList.map((product) => <ProductBox key={product._id} id={product._id} image={product.image[0]} name={product.name} price={product.price} />)
        )}
      </View>

      {/* Latest Collection */}
      <TitleBox first="BEST" second="SELLERS" />
      <Text style={[styles.fontOutfit, styles.textAlignCenter]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</Text>

      {/* Product List */}
      <View style={styles.mainProductContainer}>
        {isLoading ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </View>
        ) : (
          bestSellerList.map((product) => <ProductBox key={product._id} id={product._id} image={product.image[0]} name={product.name} price={product.price} />)
        )}
      </View>

      {/* Why Forever */}
      <View style={styles.whyContainer}>
        <WhyUs image={exchangeIcon} title="Easy Exchange Policy" text="We offer hassle free exchange policy" />
        <WhyUs image={qualityIcon} title="7 Days Return Policy" text="We provide 7 days free return policy" />
        <WhyUs image={supportIcon} title="Best customer support" text="We provide 24/7 customer support" />
      </View>

      {/* Subscribe */}
      <SubscribeBox />

      {/* Footer */}
      <Footer />
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
  fontOutfit: {
    fontFamily: 'Outfit_400Regular',
  },
  fontPrata: {
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
  mainProductContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 50,
  },
  whyContainer: {
    height: 420,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
});
