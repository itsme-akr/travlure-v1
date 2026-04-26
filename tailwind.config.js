/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4EDE2",
        magenta: "#990066",
        gold: "#CC9933",
        olive: "#8FBC7C",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
};