const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                DINRoundPro: ['Montserrat', 'sans-serif'],
                sourceSansPro: ['Source Sans Pro', 'sourceSansPro'],
            },
            colors: {
                primary: '#45995D',
                textColor: '#222222',
                textColorLight: '#8C887E',
            },
        },
    },
    plugins: [],
});