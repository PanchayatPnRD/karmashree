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
      },
    },
   
  },
  plugins: [require("flowbite/plugin")],
};

