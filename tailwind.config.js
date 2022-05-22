module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#2C49F2",
          600: "#2742D9",
          hover: "#2136B3",
          light: "#2E4DFF",
          dark: "#152373",
        },
      },
    },
  },
  plugins: [],
};
