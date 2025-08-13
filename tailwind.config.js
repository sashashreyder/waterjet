/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xlg: '1000px',
        lgplus: '1028px',
      },
    },
  },
  plugins: [],
};
