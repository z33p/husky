module.exports = {
  mode: 'jit',
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./widgets/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#22456b",
      "primary-light": "#22456bdd",
    }),
    fontSize: {
      xs: "calc(0.55rem + 0.03vw)",
      sm: "calc(0.75rem + 0.05vw)",
      base: "calc(0.95rem + 0.07vw)",
      lg: "calc(1.05rem + 0.1vw)",
      xl: "calc(1.15rem + 0.2vw)",
      "2xl": "calc(1.3rem + 0.3vw)",
      "3xl": "calc(1.45rem + 0.4vw)",
      "4xl": "calc(1.6rem + 0.5vw)",
      "5xl": "calc(1.75rem + 0.6vw)",
      "6xl": "calc(1.9rem + 0.7vw)",
      "7xl": "calc(3rem + 0.8vw)",
      "8xl": "calc(3.5rem + 0.9vw)",
      "9xl": "calc(4rem + 1vw)",
    },
  },
};
