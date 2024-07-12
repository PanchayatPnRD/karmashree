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
        "gradient-x": "gradient-x 5s ease infinite",
      },
      backgroundImage: {
        banner: "url('/assets/img/mamta_banner_bg.png')",
        curve: "url('/assets/img/curve_border2.png')",
        error: "url('/dribbble_1.gif')",
      },
      height: {
        remaining: "calc(100vh - 96px)",
        offline: "calc(100vh - 128px)", // Adjust the '4rem' value to match your navbar height
      },
      minHeight: {
        remaining: "calc(100vh - 96px)", // Adjust the '4rem' value
        offline: "calc(100vh - 128px)",
      },
      keyframes: {
        pulse2: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
