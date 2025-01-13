/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        // 一般文字大小
        text: '16px',
        // 数字大小
        num: '30px',
      },
      fontFamily: {
        'sans-normal': ['SansNormal'],
        'sans-bold': ['SansBold'],
        'sans-reg': ['SansRegular'],
        'sans-medium': ['SansMedium'],
        'num-normal': ['NumNormal'],
        pang: ['Pang'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
