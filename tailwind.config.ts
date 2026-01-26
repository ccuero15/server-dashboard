// tailwind.config.ts
import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [ "./src/**/*.{js,ts,jsx,tsx,mdx}" ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        'primary': '0 10px 25px -5px rgba(65, 105, 225, 0.4)',
      },
      colors: {
        "primary": "#4169e1",
        "background-light": "#f6f6f8",
        "background-dark": "#121520",
      },
      fontFamily: {
        "display": [ "Inter", "sans-serif" ]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [ forms ],
};
export default config;