// tailwind.config.js
import daisyui from 'daisyui';

export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {},
};
export const plugins = [daisyui];
export const daisyui = {
  themes: ["light", "dark", "cupcake"], // Add your preferred themes
  darkTheme: "dark", // Default dark theme
  base: true,
  styled: true,
  utils: true,
};