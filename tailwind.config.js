// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        proceedSlideIn: {
          "0%": { transform: "translateX(-25%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        proceedSlideIn: "proceedSlideIn 0.8s ease-out forwards",
        "spin-slow": "spin 20s linear infinite",
        "spin-slower": "spin 40s linear infinite",
        "spin-slowest": "spin 60s linear infinite",
      },
      brightness: {
        15: '.15',
        20: '.20',
        25: '.25',
        30: '.30',
      },
      width: {
        '640': '640px',
        '700': '700px',
        '720': '720px',
        '800': '800px',
      },
      height: {
        '640': '640px',
        '700': '700px',
        '720': '720px',
        '800': '800px',
      }
    },
  },
  plugins: [],
};










