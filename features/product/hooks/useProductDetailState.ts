import { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { Product } from '../types';

export const useProductDetailState = (product?: Product) => {
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!product) return;

    setMainImage(product.image[0]);
    setSelectedSize('');
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [product]);

  return {
    mainImage,
    setMainImage,
    selectedSize,
    setSelectedSize,
    scrollRef,
  };
};
