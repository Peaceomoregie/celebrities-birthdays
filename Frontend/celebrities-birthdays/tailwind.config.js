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
      },
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ],
}
