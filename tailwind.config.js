/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        myBlue: "#0A32B3",
        myPink: "#BD365D",
      },
      backgroundImage: {
        pattern: "url('./assets/backgroundImage.jpg')",
      },
      height: {
        heightFix: "calc(100vh - 80px)",
      },
    },
  },
  plugins: [],
};
