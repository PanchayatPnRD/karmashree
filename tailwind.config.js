/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('./src/assets/img/mamta_banner_bg.png')",
        curve: "url('./src/assets/img/curve_border2.png')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

