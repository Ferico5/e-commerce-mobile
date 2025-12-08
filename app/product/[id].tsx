import Header from '@/components/Header';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import axios from '../../utils/axiosInstance';

const star = require('@/assets/frontend_assets/star_icon.png');
const star_dull = require('@/assets/frontend_assets/star_dull_icon.png');

type ProductDetailProps = {
  id: string;
  name: string;
  price: number;
  image: string[];
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductDetailProps | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/single/${id}`)
      .then((res) => {
        const productData = res.data.singleProduct;
        setProduct(productData);
        setMainImage(productData.image[0]);
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err);
        Alert.alert('Error', 'Failed to load product');
      });
  }, [id]);

  if (!product) return null;

  return (
    <ScrollView>
      <Header />

      {/* Image */}
      <View className="flex-col-reverse">
        {/* Image Carousel */}
        <View className="flex-row gap-3 justify-between">
          {product.image.map((img, i) => (
            <Pressable key={i} onPress={() => setMainImage(img)}>
              <Image source={{ uri: img }} className="w-[80] h-[100]" resizeMode="cover" />
            </Pressable>
          ))}
        </View>
        {/* Main Image */}
        <Image source={{ uri: mainImage }} alt="Main Product Image" className="w-full h-[450] mt-5 mb-3" resizeMode="cover"></Image>
      </View>

      <View className='flex gap-3'>
        <Text className="font-outfit font-bold text-2xl mt-2">{product.name}</Text>
        <View className='flex-row gap-2 items-center'>
          <Image source={star} className='w-4 h-4'></Image>
          <Image source={star} className='w-4 h-4'></Image>
          <Image source={star} className='w-4 h-4'></Image>
          <Image source={star} className='w-4 h-4'></Image>
          <Image source={star_dull} className='w-4 h-4'></Image>
          <Text className='ml-3'>(122)</Text>
        </View>
        <Text className='font-outfit font-semibold text-xl mt-1'>Rp. {product.price}</Text>
      </View>
    </ScrollView>
  );
}
