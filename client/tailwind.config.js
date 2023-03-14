const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        DINRoundPro: ['DINRoundPro', 'sans-serif'],
        sourceSansPro: ['Source Sans Pro', 'sourceSansPro'],
      },
      colors: {
        primary: '#F9533E',
        textColor: '#222222',
        textColorLight: '#8C887E',
      },
    },
  },
  plugins: [],
});
