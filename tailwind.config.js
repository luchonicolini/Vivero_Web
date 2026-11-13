/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F5EF",
        surface: "#FFFEFA",
        primary: {
          DEFAULT: "#183D23",
          hover: "#102D19",
        },
        ink: "#203427",
        muted: "#526052",
        sage: "#E8EDDF",
        borderline: "#C5CDBF",
        controlBorder: "#6B7B68",
        focusRing: "#365F3A",
        error: "#A52A2A",
        whatsapp: "#25D366",
      },
      fontFamily: {
        serif: ["var(--font-baskerville)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
