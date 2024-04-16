/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        pulse2: "pulse2 1.3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        banner: "url('/assets/img/mamta_banner_bg.png')",
        curve: "url('/assets/img/curve_border2.png')",
      },
      height: {
        remaining: "calc(100vh - 98px)", // Adjust the '4rem' value to match your navbar height
      },
      minHeight: {
        remaining: "calc(100vh - 98px)", // Adjust the '4rem' value
      },
      keyframes: {
        pulse2: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: .7 },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

