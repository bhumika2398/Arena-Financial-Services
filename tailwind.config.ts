import type { Config } from "tailwindcss";

/**
 * Colour tokens. The seven brand values live once, as CSS variables in
 * app/globals.css (:root); the palette below points at them. Everything else
 * is a lighter or darker step of the same navy / blue, so there is no second
 * accent colour.
 *
 *   navy    #0B2447  dark surfaces, headings        -> deep-900
 *   blue    #1D4ED8  buttons, links, accents        -> primary-600
 *   hover   #1E40AF  primary hover                  -> primary-700
 *   tint    #EFF4FF  light section backgrounds      -> deep-50 / primary-50 / mint
 *   line    #D6E0F5  borders                        -> deep-100
 *   ink     #0F172A  body text
 *   muted   #475569  muted text                     -> deep-500
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--tint)",
          100: "#DCE7FD",
          200: "#BCD0F8",
          300: "#93B4F7", // light blue for text/icons on navy (AA on #0B2447)
          400: "#7AA2F5",
          500: "var(--blue)",
          600: "var(--blue)",
          700: "var(--blue-hover)",
          800: "#1E3A8A",
          900: "var(--navy)",
          950: "#081B38",
        },
        deep: {
          50: "var(--tint)",
          100: "var(--line)",
          200: "#B8C7E8",
          300: "#9AAFD9",
          400: "#5B6B8C",
          500: "var(--muted)",
          600: "#334155",
          700: "#1E293B",
          800: "#12305C",
          900: "var(--navy)",
          950: "#081B38",
        },
        ink: "var(--ink)",
        mint: "var(--tint)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-heading)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
