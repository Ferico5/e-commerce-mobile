/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}', './shared/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit_400Regular'],
        prata: ['Prata_400Regular'],
      },
    },
  },
  plugins: [],
};
