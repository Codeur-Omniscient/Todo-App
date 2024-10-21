/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    container: {
      center: true,
      screens: {
        md: "768px",
      },
    },
    extend: {
      colors: {
        primaryColor: "#3e3341",
        textColor: "#e1c2e4",
        darkBg: "#332934",
        veryDarBg: "#29222a",
        secondaryColor: "#8d6973",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake", "dark"],
  },
};
