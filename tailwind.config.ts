import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-background": " #f4f4f4",
        "light-grey": "#939598",
        "dark-grey": "#636466",
        "text-grey": "#667085",
        "text-dark": "#131313",
        "text-blue": "#2E4792",
        "primary-blue": "#2E3192",
        "primary-turquoise": "#0088AC",
        "primary-navy": "#0054A6",
        "primary-purple": "#662D91",
        "primary-hover": "#6E6DBB",
        "text-black":"#010202",
        "secondary-blue": "#D5D4F9",
        "button-border": "#42419A",
        "highlight-area": "#9395981A",
        "error-code": "#dc3232 !important",
        "dark-blackOpacity":"#000000B2"  
      },
    },
  },
  plugins: [],
};
export default config;
