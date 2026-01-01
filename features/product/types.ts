export interface Product {
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
}

export type SortOption = 'Relevent' | 'LowToHigh' | 'HighToLow';