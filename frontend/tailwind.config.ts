import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: "#FFD84D", // sunflower
        ink: "#221C4A", // deep indigo
        "ink-60": "rgba(34,28,74,0.6)",
        "ink-30": "rgba(34,28,74,0.3)",
        "ground-60": "rgba(255,216,77,0.6)",
        "ground-30": "rgba(255,216,77,0.3)",
        paper: "#FFFBEF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
