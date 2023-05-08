/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}",
  './node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('src/assets/images/high.png')",
      }
    },
  },
  plugins: [
    require('preline/plugin'),
    require('@tailwindcss/forms')],
}
