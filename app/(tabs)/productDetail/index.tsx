import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProductBox from '@/components/ProductBox';
import ProductSkeleton from '@/components/ProductSkeleton';
import SubscribeBox from '@/components/SubscribeBox';
import TitleBox from '@/components/TitleBox';
import WhyUs from '@/components/WhyUs';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import axios from '../../../utils/axiosInstance';

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
    <ScrollView className="flex" showsVerticalScrollIndicator={false}>
      {/* header */}
      <Header />
      {/* Hero */}
      <View className="justify-between items-center border border-1 mt-8 mb-12">
        {/* Text Hero */}
        <View className="w-[45%] mt-10 gap-3">
          <Text className="font-outfit font-bold">OUR BESTSELLERS</Text>
          <Text className="font-prata text-2xl">Latest Arrivals</Text>
          <Text className="font-outfit font-bold">SHOP NOW</Text>
        </View>

        {/* Image Hero */}
        <Image source={heroImage} className="w-full h-[280] mt-12" resizeMode="contain" />
      </View>

      {/* Latest Collection */}
      <TitleBox first="LATEST" second="COLLECTION" />
      <Text className="font-outfit text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</Text>

      {/* Product List */}
      <View className="flex flex-row flex-wrap justify-between mt-10 mb-[70]">
        {isLoading ? (
          <View className="flex-row flex-wrap justify-between w-full">
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
      <Text className="font-outfit text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</Text>

      {/* Product List */}
      <View className="flex flex-row flex-wrap justify-between mt-10 mb-[55]">
        {isLoading ? (
          <View className="flex-row flex-wrap justify-between w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </View>
        ) : (
          bestSellerList.map((product) => <ProductBox key={product._id} id={product._id} image={product.image[0]} name={product.name} price={product.price} />)
        )}
      </View>

      {/* Why Forever */}
      <View className="justify-between h-[440] mb-[50]">
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
