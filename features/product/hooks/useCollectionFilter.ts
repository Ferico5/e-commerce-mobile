import { useEffect, useState } from 'react';
import { Product, SortOption } from '../types';

export const useCollectionFilter = (products: Product[]) => {
  const [sortOption, setSortOption] = useState<SortOption>('Relevent');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));
  };

  const toggleSubCategory = (type: string) => {
    setSelectedSubCategories((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);

    const subCategoryMatch = selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategory);

    const searchMatch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

    return categoryMatch && subCategoryMatch && searchMatch;
  });

  const sortedProducts = (() => {
    if (sortOption === 'LowToHigh') {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'HighToLow') {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    }
    return filteredProducts;
  })();

  return {
    sortOption,
    setSortOption,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    selectedSubCategories,
    toggleCategory,
    toggleSubCategory,
    products: sortedProducts,
  };
};
