import { useProducts } from '@/features/product/hooks';
import { getBestSellerList, getLastCollectionList } from '@/features/product/utils';
import Footer from '@/shared/components/Footer';
import Header from '@/shared/components/Header';
import ProductBox from '@/shared/components/ProductBox';
import ProductSkeleton from '@/shared/components/ProductSkeleton';
import SubscribeBox from '@/shared/components/SubscribeBox';
import TitleBox from '@/shared/components/TitleBox';
import WhyUs from '@/shared/components/WhyUs';
import { useEffect } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';

import exchangeIcon from '@/assets/frontend_assets/exchange_icon.png';
import heroImage from '@/assets/frontend_assets/hero_img.png';
import qualityIcon from '@/assets/frontend_assets/quality_icon.png';
import supportIcon from '@/assets/frontend_assets/support_img.png';

export default function Index() {
  const { data: products = [], isLoading, isError } = useProducts();

  useEffect(() => {
    if (isError) {
      Alert.alert('Error', 'Failed to load products.');
    }
  }, [isError]);

  const lastCollectionList = getLastCollectionList(products);
  const bestSellerList = getBestSellerList(products);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
        <Image source={heroImage} className="w-full h-[280] mt-12" resizeMode="cover" />
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
