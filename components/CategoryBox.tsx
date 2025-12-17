import { Pressable, Text, View } from 'react-native';

type CategoryBoxProps = {
  title: string;
  categories: string[];
  selected: string[];
  onChange: (category: string) => void;
  className: string;
};

const CategoryBox = ({ title, categories = [], selected, onChange, className }: CategoryBoxProps) => {
  return (
    <View className={`flex flex-col border border-[#E5E7EB] py-3 pl-4 ${className}`}>
      {/* Title */}
      <Text className="mb-3 text-sm font-outfit">{title}</Text>

      {/* Category List */}
      {categories.map((category) => {
        const isChecked = selected.includes(category);

        return (
          <Pressable key={category} onPress={() => onChange(category)} className="flex-row items-center mb-2">
            {/* Custom Checkbox */}
            <View className={`w-4 h-4 mr-2 border rounded-sm items-center justify-center ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`}>{isChecked && <View className="w-2 h-2 bg-white rounded-sm" />}</View>

            {/* Label */}
            <Text className="text-[#374151] text-sm font-outfit">{category}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default CategoryBox;
