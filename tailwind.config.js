/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        primary: '#f2f7f5',
        headline: "#00473e",
        paragraph: "#475d5b",
        highlight: "#faae2b",
        secondary: "#ffa8ba",
        tertiary: "#fa5246",
      },
      
    },
    // screens:{
    //   "2xl": {max: "1535px"},
    //   //this means  @media(max-width: 1535px )
    //   xl: { max: "1279px" },
    //   // => @media (max-width: 1279px) { ... }

    //   lg: { max: "1023px" },
    //   // => @media (max-width: 1023px) { ... }

    //   md: { max: "767px" },
    //   // => @media (max-width: 767px) { ... }

    //   sm: { max: "639px" },
    //   // => @media (max-width: 639px) { ... }

    //   xs: { max: "479px" },
    //   // => @media (max-width: 479px) { ... }

    // }
  },
  plugins: [],
}
