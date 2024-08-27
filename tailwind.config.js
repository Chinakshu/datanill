// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        p1: '#F72119', // Add your custom color here
        ba: '#f72119',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Add the Inter font here
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};