import { useAddToCart } from "@/features/cart/hooks";
import { useProductDetail, useRelatedProducts } from "@/features/product/hooks";
import { useProductDetailState } from "@/features/product/hooks/useProductDetailState";
import Footer from "@/shared/components/Footer";
import Header from "@/shared/components/Header";
import ProductBox from "@/shared/components/ProductBox";
import ProductDetailSkeleton from "@/shared/components/ProductDetailSkeleton";
import { useAuthStore } from "@/stores/auth.store";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import star_dull from "@/assets/frontend_assets/star_dull_icon.png";
import star from "@/assets/frontend_assets/star_icon.png";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((state) => state.user);

  const { data: product, isLoading, isError } = useProductDetail(id);
  const { data: relatedProducts = [] } = useRelatedProducts(
    product?.category,
    product?._id
  );

  const { mainImage, setMainImage, selectedSize, setSelectedSize, scrollRef } =
    useProductDetailState(product);

  const addToCartMutation = useAddToCart();

  useEffect(() => {
    if (isError) {
      Alert.alert("Error", "Failed to load product detail.");
    }
  }, [isError]);

  const handleAddToCart = () => {
    if (!user) return router.push("/Auth");

    if (!product) return;

    if (!selectedSize) {
      Alert.alert("Error", "Please select a size first!");
      return;
    }

    addToCartMutation.mutate({
      productId: product._id,
      quantity: 1,
      size: selectedSize,
    });
  };

  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
      <Header />

      {!product || isLoading ? (
        <ProductDetailSkeleton />
      ) : (
        <>
          {/* Image */}
          <View className="flex-col-reverse border-t border-[#E5E7EB] pt-3">
            {/* Image Carousel */}
            <View className="flex-row gap-3 justify-between">
              {product.image.map((img, i) => (
                <Pressable key={i} onPress={() => setMainImage(img)}>
                  <Image
                    source={{ uri: img }}
                    className="w-[80] h-[100]"
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </View>
            {/* Main Image */}
            <Image
              source={{ uri: mainImage }}
              alt="Main Product Image"
              className="w-full h-[450] mt-5 mb-3"
              resizeMode="cover"
            ></Image>
          </View>

          {/* Name, Price */}
          <View className="flex gap-3">
            <Text className="font-outfit font-bold text-2xl mt-2">
              {product.name}
            </Text>
            <View className="flex-row gap-2 items-center">
              <Image source={star} className="w-4 h-4"></Image>
              <Image source={star} className="w-4 h-4"></Image>
              <Image source={star} className="w-4 h-4"></Image>
              <Image source={star} className="w-4 h-4"></Image>
              <Image source={star_dull} className="w-4 h-4"></Image>
              <Text className="ml-3">(122)</Text>
            </View>
            <Text className="font-outfit font-semibold text-xl mt-1">
              Rp. {product.price}
            </Text>
          </View>

          {/* desc */}
          <View className="mt-6">
            <Text className="font-outfit text-[#5C6872]">
              A lightweight, usually knitted, pullover shirt, close-fitting and
              with a round neckline and short sleeves, worn as an undershirt or
              outer garment.
            </Text>
          </View>

          {/* Size */}
          <View className="mt-9">
            <Text className="font-outfit">Select Size</Text>
            <View className="flex-row gap-2 mt-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => {
                const isAvailable = product.sizes.includes(size);
                const isSelected = selectedSize === size;

                return (
                  <Pressable
                    key={size}
                    onPress={() => isAvailable && setSelectedSize(size)}
                    disabled={!isAvailable}
                    className={`px-4 py-2 border font-medium transition rounded-sm ${isAvailable ? (isSelected ? "bg-black text-white border-black" : "bg-white text-black border-gray-300") : "bg-gray-200 text-gray-400 border-gray-300"}`}
                  >
                    <Text
                      className={`
                ${isAvailable ? (isSelected ? "text-white" : "text-black") : "text-gray-400"}
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
          <Pressable
            className={`mt-9 border bg-black self-start items-center justify-center ${addToCartMutation.isPending ? "opacity-70" : ""}`}
            onPress={handleAddToCart}
            disabled={addToCartMutation.isPending}
          >
            {/* Invisible text to lock width */}
            <Text className="px-8 py-3 text-sm text-white font-outfit opacity-0">
              ADD TO CART
            </Text>

            {/* Overlay */}
            <View className="absolute">
              {addToCartMutation.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="px-8 py-3 text-sm text-white font-outfit">
                  ADD TO CART
                </Text>
              )}
            </View>
          </Pressable>

          {/* 100% original product */}
          <View className="mt-10 border-t border-[#E5E7EB]">
            <Text className="font-outfit text-[#5C6872] text-sm mt-7">
              100% Original Product
            </Text>
            <Text className="font-outfit text-[#5C6872] text-sm">
              Cash on delivery is available on this product.
            </Text>
            <Text className="font-outfit text-[#5C6872] text-sm">
              Easy return and exchange policy within 7 days.
            </Text>
          </View>

          {/* Description */}
          <View className="mt-10">
            <View className="flex flex-row">
              <Text className="font-outfit border border-[#E5E7EB] px-5 py-3 font-bold">
                Description
              </Text>
              <Text className="font-outfit border border-[#E5E7EB] px-5 py-3">
                Reviews (122)
              </Text>
            </View>
            <View className="border border-[#E5E7EB] px-5 py-3">
              <Text className="font-outfit text-[#5C6872]">
                An e-commerce website is an online platform that facilitates the
                buying and selling of products or services over the internet. It
                serves as a virtual marketplace where businesses and individuals
                can showcase their products, interact with customers, and
                conduct transactions without the need for a physical presence.
                E-commerce websites have gained immense popularity due to their
                convenience, accessibility, and the global reach they offer.
              </Text>
              <Text className="font-outfit text-[#5C6872]">
                E-commerce websites typically display products or services along
                with detailed descriptions, images, prices, and any available
                variations (e.g., sizes, colors). Each product usually has its
                own dedicated page with relevant information.
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
                <ProductBox
                  key={item._id}
                  id={item._id}
                  image={item.image[0]}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </View>
          </View>
        </>
      )}

      <Footer />
    </ScrollView>
  );
}
