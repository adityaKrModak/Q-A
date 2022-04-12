module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      lobster: ["Lobster", "cursive"],
      cormorant: ['"Cormorant Garamond"', "serif"],
    },
    extend: {
      backgroundImage: {
        "home-background": "url('/img/home-background.jpg')",
      },
    },
  },
  plugins: [],
};
