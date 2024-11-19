/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': '#b8c3ed',
        'dark-blue': '#4058c4',
      },
      fontFamily:{
        'eczar': ['Eczar', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ],
}
