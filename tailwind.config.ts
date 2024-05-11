import type { Config } from "tailwindcss";

const config: Config  ={
  content:[
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // fontFamily: {
      //   robotos: ['var(--font-robotos)', ...fontFamily.serif],
      // },
      colors:{
        primary: '#fffffe',
        headline: "#004643",
        paragraph: "#abd1c6",
        highlight: "#f9bc60",
        secondary: "#001e1d",
        tertiary: "#e16162",
        lightshadow:"#e8e4e6",
        darkshadow: "#000000",
      },
      animation:{
        'spin-slow': 'spin 8s linear infinite'
      },
      
    },
    screens:{
      "2xl": {max: "1535px"},
      //this means  @media(max-width: 1535px )
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }

    }
  },
  plugins: [],
}

export default config;
