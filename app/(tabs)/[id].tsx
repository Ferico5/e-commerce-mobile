import { useAuth } from '@/auth/AuthContext';
import { useCart } from '@/auth/CartContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProductBox from '@/components/ProductBox';
import ProductDetailSkeleton from '@/components/ProductDetailSkeleton';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import axios from '../../utils/axiosInstance';

const star = require('@/assets/frontend_assets/star_icon.png');
const star_dull = require('@/assets/frontend_assets/star_dull_icon.png');

type ProductDetailProps = {
  _id: string;
  id: string;
  name: string;
  price: number;
  image: string[];
  sizes: string;
  category: string;
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductDetailProps | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<ProductDetailProps[]>([]);
  const { setCartCount, fetchCartCount } = useCart();
  const { user, authReady } = useAuth();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!id) return;

    setProduct(null);
    setMainImage('');
    setSelectedSize('');

    axios
      .get(`/single/${id}`)
      .then((res) => {
        const productData = res.data.singleProduct;
        setProduct(productData);
        setMainImage(productData.image[0]);

        // scroll to top
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err);
        Alert.alert('Error', 'Failed to load product');
      });
  }, [id]);

  useEffect(() => {
    if (product?.category) {
      axios
        .get(`/products?category=${product.category}`)
        .then((res) => {
          const filtered = res.data.products.filter((p: ProductDetailProps) => p._id !== product._id);
          setRelatedProducts(filtered.slice(0, 5));
        })
        .catch((err) => {
          console.error('Failed to fetch related products:', err);
        });
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!authReady) return;
    if (!user) {
      router.push('/Auth');
      return;
    }

    if (!product) return;

    if (!selectedSize) {
      Alert.alert('Error', 'Please select a size first!');
      return;
    }

    try {
      setIsAddingToCart(true);

      const body = {
        productId: product._id,
        quantity: 1,
        size: selectedSize,
      };

      await axios.post('/add-cart', body);
      await fetchCartCount();
      Alert.alert('Success', 'Item added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
      <Header />

      {!product ? (
        <ProductDetailSkeleton />
      ) : (
        <>
          {/* Image */}
          <View className="flex-col-reverse border-t border-[#E5E7EB] pt-3">
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
          <Pressable className={`mt-9 border bg-black self-start items-center justify-center ${isAddingToCart ? 'opacity-70' : ''}`} onPress={handleAddToCart} disabled={isAddingToCart}>
            {/* Invisible text to lock width */}
            <Text className="px-8 py-3 text-sm text-white font-outfit opacity-0">ADD TO CART</Text>

            {/* Overlay */}
            <View className="absolute">{isAddingToCart ? <ActivityIndicator size="small" color="#fff" /> : <Text className="px-8 py-3 text-sm text-white font-outfit">ADD TO CART</Text>}</View>
          </Pressable>

          {/* 100% original product */}
          <View className="mt-10 border-t border-[#E5E7EB]">
            <Text className="font-outfit text-[#5C6872] text-sm mt-7">100% Original Product</Text>
            <Text className="font-outfit text-[#5C6872] text-sm">Cash on delivery is available on this product.</Text>
            <Text className="font-outfit text-[#5C6872] text-sm">Easy return and exchange policy within 7 days.</Text>
          </View>

          {/* Description */}
          <View className="mt-10">
            <View className="flex flex-row">
              <Text className="font-outfit border border-[#E5E7EB] px-5 py-3 font-bold">Description</Text>
              <Text className="font-outfit border border-[#E5E7EB] px-5 py-3">Reviews (122)</Text>
            </View>
            <View className="border border-[#E5E7EB] px-5 py-3">
              <Text className="font-outfit text-[#5C6872]">
                An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products,
                interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
              </Text>
              <Text className="font-outfit text-[#5C6872]">
                E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant
                information.
              </Text>
            </View>
          </View>

          {/* Related Product */}
          <View className="mt-20">
            {/* Header Title */}
            <View className="flex items-center">
              <Text className="font-outfit text-3xl text-[#707070]">
                RELATED <Text className="text-[#171717]">PRODUCTS</Text>
              </Text>
            </View>
            {/* Product List */}
            <View className="flex-row flex-wrap justify-between mt-3">
              {relatedProducts.map((item) => (
                <ProductBox key={item._id} id={item._id} image={item.image[0]} name={item.name} price={item.price} />
              ))}
            </View>
          </View>
        </>
      )}

      <Footer />
    </ScrollView>
  );
}
