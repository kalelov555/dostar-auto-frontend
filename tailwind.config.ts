import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#405D72",
        primary: "#2a81dd",
        "gray-primary": "rgba(28,24,25,.1)",
        "gray-secondary": "#888b94",
      },
    },
  },
  plugins: [],
};
export default config;
