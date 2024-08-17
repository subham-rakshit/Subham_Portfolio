/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        familjen: ["Familjen Grotesk", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        franklin: ["Libre Franklin", "sans-serif"],
        matemasie: ["Matemasie", "sans-serif"],
      },
    },
  },
  plugins: [],
};
