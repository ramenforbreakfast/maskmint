const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      yellow: colors.yellow,
      purple: colors.purple,
      blue: colors.cyan,
      cyan: colors.cyan,
      gray: colors.gray,
      red: colors.red,
      green: colors.green,
      pink: colors.pink,
      indigo: colors.indigo,
      lime: colors.lime,
      emerald: colors.emerald,
      teal: colors.teal,
      white: '#fff',
    },
    extend: {},
    fontFamily: {
      'FredokaOne': ['Fredoka One', 'cursive']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
