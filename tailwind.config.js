import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '15': '15deg',
        '30': '30deg',
        'minus-30': '-30deg',
      },
      translate: {
        'z-40px': 'translateZ(40px)',
      },
      rotate: {
        'y-90': 'rotateY(90deg)',
        'y-minus-90': 'rotateY(-90deg)',
        'y-180': 'rotateY(180deg)',
        'x-90': 'rotateX(90deg)',
        'x-minus-90': 'rotateX(-90deg)',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
