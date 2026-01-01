import { useProducts } from '@/features/product/hooks';
import { useCollectionFilter } from '@/features/product/hooks/useCollectionFilter';
import CategoryBox from '@/shared/components/CategoryBox';
import Footer from '@/shared/components/Footer';
import Header from '@/shared/components/Header';
import ProductBox from '@/shared/components/ProductBox';
import ProductSkeleton from '@/shared/components/ProductSkeleton';
import TitleBox from '@/shared/components/TitleBox';
import { optimizeCloudinaryUrl } from '@/shared/utils/optimizeCloudinary';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Close from '@/assets/frontend_assets/cross_icon.png';
import Search from '@/assets/frontend_assets/search_icon.png';

export default function Collection() {
  const { showSearch } = useLocalSearchParams<{ showSearch?: string }>();
  const isSearchVisible = showSearch === 'true';

  const { data: products = [], isLoading, isError } = useProducts();

  const { products: filteredProducts, sortOption, setSortOption, searchTerm, setSearchTerm, selectedCategories, selectedSubCategories, toggleCategory, toggleSubCategory } = useCollectionFilter(products);

  const isSortOption = (value: string): value is 'Relevent' | 'LowToHigh' | 'HighToLow' => {
    return ['Relevent', 'LowToHigh', 'HighToLow'].includes(value);
  };

  const [openFilters, setOpenFilters] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(sortOption);
  const [items, setItems] = useState([
    { label: 'Sort by: Relevent', value: 'Relevent' },
    { label: 'Sort by: Low to High', value: 'LowToHigh' },
    { label: 'Sort by: High to Low', value: 'HighToLow' },
  ]);

  useEffect(() => {
    if (isError) {
      Alert.alert('Error', 'Failed to load products.');
    }
  }, [isError]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
          <CategoryBox title="CATEGORIES" categories={['Men', 'Women', 'Kids']} selected={selectedCategories} onChange={toggleCategory} className="my-5" />

          <CategoryBox title="TYPE" categories={['Topwear', 'Bottomwear', 'Winterwear']} selected={selectedSubCategories} onChange={toggleSubCategory} className="" />
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
          onChangeValue={(val) => {
            if (val && isSortOption(val)) {
              setSortOption(val);
            }
          }}
          style={{ borderColor: '#E5E7EB', borderWidth: 1, height: 30 }}
          textStyle={{ fontFamily: 'Outfit_400Regular', color: '#000', fontSize: 12 }}
          selectedItemContainerStyle={{ backgroundColor: '#bbdefb' }}
        />
      </View>

      {/* product list */}
      <View className="flex-row flex-wrap justify-between mt-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
          : filteredProducts.map((product) => <ProductBox key={product._id} id={product._id} image={optimizeCloudinaryUrl(product.image[0])} name={product.name} price={product.price} />)}
      </View>

      <Footer />
    </ScrollView>
  );
}
