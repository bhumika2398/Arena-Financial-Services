import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Emerald teal — main brand color, CTAs, active/link states.
        primary: {
          50: "#eafbf5",
          100: "#cdf3e3",
          200: "#9de6c8",
          300: "#64d3a8",
          400: "#34b98a",
          500: "#13a173",
          600: "#068562",
          700: "#056b50",
          800: "#075440",
          900: "#084435",
          950: "#04261e",
        },
        // Deep navy-teal — dark section backgrounds, footer, dark navbar state.
        deep: {
          50: "#eef5f6",
          100: "#d3e6e9",
          200: "#a8ccd2",
          300: "#78adb6",
          400: "#4a8a96",
          500: "#2c6b78",
          600: "#1c525e",
          700: "#123f49",
          800: "#0b2f38",
          900: "#013f4a",
          950: "#011820",
          // Alternate near-black-teal dark section backgrounds, for rhythm
          // between stacked dark sections so they don't read as identical.
          alt1: "#101c13",
          alt2: "#022b22",
        },
        // Soft sage-teal — hover states, highlight accents, icon backgrounds.
        sage: {
          50: "#f1f8f4",
          100: "#dceee2",
          200: "#b9dcc7",
          300: "#8fc4a7",
          400: "#6fae8d",
          500: "#569578",
          600: "#457a63",
          700: "#38624f",
          800: "#2c4d3f",
          900: "#233f33",
          950: "#142720",
        },
        mint: "#f4fbf8",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-heading)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 20% 20%, rgba(6,133,98,0.16), transparent 50%), radial-gradient(circle at 80% 0%, rgba(1,63,74,0.45), transparent 50%)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
        drift: "drift 16s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
        "ray-sweep": "ray-sweep 10s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.08)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "33%": { transform: "translate(20px, -15px)" },
          "66%": { transform: "translate(-15px, 15px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0%, 0%)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 2%)" },
          "30%": { transform: "translate(-3%, 3%)" },
          "40%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-2%, 2%)" },
          "60%": { transform: "translate(3%, -3%)" },
          "70%": { transform: "translate(-3%, -2%)" },
          "80%": { transform: "translate(2%, 3%)" },
          "90%": { transform: "translate(-2%, -2%)" },
        },
        "ray-sweep": {
          "0%, 100%": { opacity: "0.12", transform: "rotate(0deg)" },
          "50%": { opacity: "0.28", transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
