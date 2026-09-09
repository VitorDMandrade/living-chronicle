/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void-bg': '#07090d',
        'paper-ink': '#ede8dc',
        'steam-gray': '#1e2530',
        'brass-amber': '#d97706',
        'blood-crimson': '#dc2626',
      }
    },
  },
  plugins: [],
};
