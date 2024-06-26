import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bitter: ["Bitter", "Nanum Myeongjo", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "orange": "#F48B10",
        "bluebase": "#00AAE0",
        "grayprogress": "#D9D9D9",
        "dark1": "#363062",
      },
      minHeight: {
        
        '128': '50rem',
        '130': '52rem',
      },
      height:{
        '120': '49rem',
        '100': '35rem',
      }
    },
  },
  plugins: [],
};
export default config;
