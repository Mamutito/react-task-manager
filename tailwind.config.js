/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      md: "1200px",
    },
    extend: {
      colors: {
        myBlue: "#0A32B3",
        myPink: "#BD365D",
      },
      backgroundImage: {
        pattern: "url('./assets/backgroundImage.jpg')",
      },
    },
  },
  plugins: [],
};
