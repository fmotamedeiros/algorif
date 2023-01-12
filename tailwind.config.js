/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      'smMui': '600px',

      'sm': '640px',

      'md': '768px',

      'mdMui': '1000px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    }
  },
  plugins: [],
}
