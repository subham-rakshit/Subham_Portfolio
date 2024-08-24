/** @type {import('tailwindcss').Config} **/
import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        familjen: ["Familjen Grotesk", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        franklin: ["Libre Franklin", "sans-serif"],
        matemasie: ["Matemasie", "sans-serif"],
      },
      boxShadow: {
        custom: "0px 0px 5px 1px #000",
        customInset: "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff",
      },
    },
  },
  plugins: [],
};
