import CategoryBox from '@/components/CategoryBox';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProductBox from '@/components/ProductBox';
import ProductSkeleton from '@/components/ProductSkeleton';
import TitleBox from '@/components/TitleBox';
import axios from '@/utils/axiosInstance';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Search = require('@/assets/frontend_assets/search_icon.png');
const Close = require('@/assets/frontend_assets/cross_icon.png');

type ProductProps = {
  _id: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  image: string[];
};

export default function Collection() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [sortOption, setSortOption] = useState('Relevent');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const { showSearch } = useLocalSearchParams<{ showSearch?: string }>();
  const isSearchVisible = showSearch === 'true';
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [openFilters, setOpenFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(sortOption);
  const [items, setItems] = useState([
    { label: 'Sort by: Relevent', value: 'Relevent' },
    { label: 'Sort by: Low to High', value: 'LowToHigh' },
    { label: 'Sort by: High to Low', value: 'HighToLow' },
  ]);

  useEffect(() => {
    axios
      .get('/list')
      .then((response) => {
        setProducts(response.data.listProduct);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filter Category (Gender)
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));
  };

  // Filter Sub Category (Types)
  const handleSubCategoryChange = (type: string) => {
    setSelectedSubCategories((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  // Show Filter what users checklist and search
  const getFilteredProducts = () => {
    return products.filter((product) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const subCategoryMatch = selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategory);
      const searchMatch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      return categoryMatch && subCategoryMatch && (!showSearch || searchMatch || debouncedSearchTerm === '');
    });
  };

  // Sort By Price and Filter
  const getSortedProducts = () => {
    const filtered = getFilteredProducts();
    if (sortOption === 'LowToHigh') {
      return [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'HighToLow') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  };

  // optimize cloudinary img
  const optimizeCloudinaryUrl = (url: string): string => {
    if (!url) return '';
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  };

  return (
    <ScrollView className="flex" showsVerticalScrollIndicator={false}>
      <Header />

      {isSearchVisible && (
        <View className="bg-[#F9FAFB] border-y border-[#E5E7EB] py-5 flex justify-center items-center">
          <View className="flex flex-row items-center justify-center gap-2 w-[70%]">
            <View className="relative flex-grow">
              <TextInput placeholder="Search" value={searchTerm} onChangeText={setSearchTerm} className="w-full h-10 px-4 py-2 pr-10 text-sm border border-[#9CA3AF] rounded-full font-outfit" />
              <Image source={Search} className="w-3 h-3 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </View>

            <Pressable
              onPress={() => {
                setSearchTerm('');
                router.replace('/(tabs)/collection');
              }}
            >
              <Image source={Close} className="w-3 ml-2" />
            </Pressable>
          </View>
        </View>
      )}

      <View className="border-t border-[#E5E7EB] pt-3">
        <Pressable onPress={() => setOpenFilters(!openFilters)}>
          <Text className="font-outfit text-2xl mt-3">
            FILTERS
            <Text>{openFilters ? '  ▲' : '  ▼'}</Text>
          </Text>
        </Pressable>
      </View>

      {/* show or hide filter */}
      {openFilters && (
        <>
          <CategoryBox title="CATEGORIES" categories={['Men', 'Women', 'Kids']} selected={selectedCategories} onChange={handleCategoryChange} className="my-5" />

          <CategoryBox title="TYPE" categories={['Topwear', 'Bottomwear', 'Winterwear']} selected={selectedSubCategories} onChange={handleSubCategoryChange} className="" />
        </>
      )}

      {/* product section (sort) */}
      <View className="mt-10 flex flex-row justify-between items-center gap-2">
        <View className="pt-2">
          <TitleBox first="ALL" second="COLLECTIONS" />
        </View>

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(val) => val && setSortOption(val)}
          style={{ borderColor: '#E5E7EB', borderWidth: 1, height: 30 }}
          textStyle={{ fontFamily: 'Outfit_400Regular', color: '#000', fontSize: 12 }}
          selectedItemContainerStyle={{ backgroundColor: '#bbdefb' }}
        />
      </View>

      {/* product list */}
      <View className="flex-row flex-wrap justify-between mt-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
          : getSortedProducts().map((product: ProductProps) => <ProductBox key={product._id} id={product._id} image={optimizeCloudinaryUrl(product.image[0])} name={product.name} price={product.price} />)}
      </View>

      <Footer />
    </ScrollView>
  );
}
