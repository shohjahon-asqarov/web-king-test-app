/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow': '#f8932',
        'card-bg': '#f9fafb',
        'purple': '#7054e6'
      }
    },
  },
  plugins: [],
}