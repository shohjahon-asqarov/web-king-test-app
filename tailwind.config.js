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
        'card-bg': '#F5F5F5',
        'purple': '#8643DC'
      }
    },
  },
  plugins: [],
}