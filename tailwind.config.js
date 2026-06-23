/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f6fb',
          100: '#e8edf6',
          200: '#cbd8eb',
          300: '#a3bbdb',
          400: '#7497c6',
          500: '#5278b0',
          600: '#3f5e94',
          700: '#344c78',
          800: '#2f4264',
          900: '#2b3a55',
        },
      },
    },
  },
  plugins: [],
}
