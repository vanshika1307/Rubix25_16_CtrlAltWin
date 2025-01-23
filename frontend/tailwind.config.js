/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Bebas Neue", "serif"],
        body: ["Exo 2", "serif"],
        style: ["Playwrite VN", "serif"],
      },
    },
  },
  plugins: [],
};
