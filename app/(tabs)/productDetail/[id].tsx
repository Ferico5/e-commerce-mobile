import Header from '@/components/Header';
import ProductDetailSkeleton from '@/components/ProductDetailSkeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import axios from '../../../utils/axiosInstance';

const star = require('@/assets/frontend_assets/star_icon.png');
const star_dull = require('@/assets/frontend_assets/star_dull_icon.png');

type ProductDetailProps = {
  _id: string;
  id: string;
  name: string;
  price: number;
  image: string[];
  sizes: string;
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

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        router.push('/(tabs)/productDetail'); // change to login later, for now use this because havent create login page
        return;
      }

      if (!selectedSize) {
        Alert.alert('Error', 'Please select a size first!');
        return;
      }

      const body = {
        productId: product._id,
        quantity: 1,
        size: selectedSize,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('/add-cart', body, config);
      // await fetchCartCount();
      Alert.alert('Success', 'Item added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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

      {/* Name, Price */}
      <View className="flex gap-3">
        <Text className="font-outfit font-bold text-2xl mt-2">{product.name}</Text>
        <View className="flex-row gap-2 items-center">
          <Image source={star} className="w-4 h-4"></Image>
          <Image source={star} className="w-4 h-4"></Image>
          <Image source={star} className="w-4 h-4"></Image>
          <Image source={star} className="w-4 h-4"></Image>
          <Image source={star_dull} className="w-4 h-4"></Image>
          <Text className="ml-3">(122)</Text>
        </View>
        <Text className="font-outfit font-semibold text-xl mt-1">Rp. {product.price}</Text>
      </View>

      {/* desc */}
      <View className="mt-6">
        <Text className="font-outfit text-[#5C6872]">A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.</Text>
      </View>

      {/* Size */}
      <View className="mt-9">
        <Text className="font-outfit">Select Size</Text>
        <View className="flex-row gap-2 mt-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
            const isAvailable = product.sizes.includes(size);
            const isSelected = selectedSize === size;

            return (
              <Pressable
                key={size}
                onPress={() => isAvailable && setSelectedSize(size)}
                disabled={!isAvailable}
                className={`px-4 py-2 border font-medium transition rounded-sm ${isAvailable ? (isSelected ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300') : 'bg-gray-200 text-gray-400 border-gray-300'}`}
              >
                <Text
                  className={`
              ${isAvailable ? (isSelected ? 'text-white' : 'text-black') : 'text-gray-400'}
            `}
                >
                  {size}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Add to Cart Button */}
      <Pressable className="mt-9 border bg-black self-start" onPress={handleAddToCart}>
        <Text className="px-8 py-3 text-sm text-white font-outfit">ADD TO CART</Text>
      </Pressable>
    </ScrollView>
  );
}
