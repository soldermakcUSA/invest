import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        shell: "var(--shell)",
        ember: "var(--ember)",
        tide: "var(--tide)",
        line: "var(--line)",
        mist: "var(--mist)"
      },
      boxShadow: {
        haze: "0 18px 80px rgba(18, 30, 39, 0.12)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(223, 212, 196, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(223, 212, 196, 0.15) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
