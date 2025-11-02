/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#60a5fa',
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
};
