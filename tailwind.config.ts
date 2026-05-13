import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Primär-Akzent (Corporate Orange) */
        brand: {
          DEFAULT: "#FF6600",
          50: "#fff4ed",
          100: "#ffe4d4",
          200: "#ffc4a8",
          300: "#ff9a6b",
          400: "#ff742f",
          500: "#FF6600",
          600: "#e55a00",
          700: "#bf4a00",
          800: "#993d08",
          900: "#7a350f",
        },
        /** Delikaya / Loxicat-style vibrant orange (#FF7F00) */
        gold: {
          50: "#fff7ed",
          100: "#ffedd3",
          200: "#ffc48a",
          300: "#ffa14d",
          400: "#ff8f26",
          500: "#FF7F00",
          600: "#e06800",
          700: "#b35300",
          800: "#8c4208",
          900: "#6f3810",
          950: "#3b1a06",
        },
        sand: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
        },
        ink: "#171412",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "grid-warm":
          "linear-gradient(to right, rgba(255, 127, 0, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 127, 0, 0.08) 1px, transparent 1px)",
        "hero-wash":
          "radial-gradient(ellipse 80% 60% at 85% 20%, rgba(255, 127, 0, 0.2), transparent 55%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
