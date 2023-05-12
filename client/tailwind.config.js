const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        DINRoundPro: ["Montserrat", "sans-serif"],
        sourceSansPro: ["Source Sans Pro", "sourceSansPro"],
      },
      
      colors: {
        primary: "#45995D",
        textColor: "#222222",
        textColorLight: "#8C887E",
        textColorLighter: "#BFBFBF",
        textColorLightest: "#E5E5E5",
        selectBlack: "#222222",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
});
