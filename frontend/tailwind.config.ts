import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#f6f3f1",
        "lake-blue": "#2b59d1",
        "periwinkle-mist": "#cfdaf5",
        "sky-blue": "#a0b5eb",
        mint: "#a7fccd",
        coral: "#ff9473",
        gold: "#ecda98",
        crimson: "#f37a0a",
        "off-black": "#242424",
        ink: "#000000",
        graphite: "#4e4d4d",
        smoke: "#797776",
        ash: "#cecac8",
      },
      fontFamily: {
        serif: ["var(--font-untitled-serif)", "Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-diatype-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "40px",
        card: "40px",
        button: "100px",
        pill: "9999px",
      },
      maxWidth: {
        page: "1432px",
      },
      boxShadow: {
        subtle: "rgba(0, 0, 0, 0.06) 0px 4px 20px 0px",
      },
    },
  },
  plugins: [],
};
export default config;
