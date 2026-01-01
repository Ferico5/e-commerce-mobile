import cartIcon from '@/assets/frontend_assets/cart_icon.png';
import LogoIcon from '@/assets/frontend_assets/logo.png';
import profileIcon from '@/assets/frontend_assets/profile_icon.png';
import searchIcon from '@/assets/frontend_assets/search_icon.png';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Link, useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

export default function Header() {
  const { logout, user } = useAuth();
  const { cartCount, resetCart } = useCart();
  const router = useRouter();

  const handleLogout = async () => {
    const role = user?.role;

    resetCart();
    await logout();

    if (role === 'admin') {
      // router.replace('/AuthAdmin');
    } else {
      router.replace('/Auth');
    }
  };

  return (
    <View className="justify-between items-center flex-row">
      {/* Image */}
      <Link href={'/'} className="w-[35%]">
        <Image source={LogoIcon} resizeMode="contain" />
      </Link>

      {/* Icon */}
      <View className={`flex-row ${user ? 'w-[50%]' : 'w-[35%]'} justify-between mr-1`}>
        {/* icon collection */}
        <Link
          href={{
            pathname: '/(tabs)/collection',
            params: { showSearch: 'true' },
          }}
        >
          <Image source={searchIcon} className="w-7 h-7" resizeMode="contain" />
        </Link>
        {/* icon auth */}
        <Link href={'/Auth'}>
          <Image source={profileIcon} className="w-7 h-7" resizeMode="contain" />
        </Link>

        <Link href={'/Cart'}>
          {/* Cart Wrapper */}
          <View className="relative">
            <Image source={cartIcon} className="w-7 h-7" resizeMode="contain" />

            {/* Cart Badge */}
            <View className="absolute -bottom-2 -right-1 min-w-[18px] h-[18px] bg-black rounded-full flex items-center justify-center px-1">
              <Text className="text-white text-xs font-outfit">{cartCount}</Text>
            </View>
          </View>
        </Link>

        {user && (
          <Pressable onPress={handleLogout}>
            <Text className="font-outfit">Logout</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
