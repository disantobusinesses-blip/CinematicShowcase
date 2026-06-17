import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#111111",
        "text-primary": "#F5F0E8",
        "text-body": "#E5E5E5",
        "text-muted": "#888888",
        gold: "#C9A84C",
        "gold-hover": "#E8C98E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderColor: {
        "gold-soft": "rgba(201, 168, 76, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
