/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary blue used in the top header / icon rail
        brand: {
          50: '#eff4ff',
          100: '#dbe6ff',
          200: '#bdd0ff',
          300: '#90b0ff',
          400: '#5c84fb',
          500: '#3b6fd4',
          600: '#2f59b8',
          700: '#274a99',
          800: '#243f7d',
          900: '#1e3a8a',
        },
        // Bright pink accent used for the active nav item
        accent: {
          DEFAULT: '#ec4899',
          dark: '#db2777',
        },
      },
    },
  },
  plugins: [],
}
