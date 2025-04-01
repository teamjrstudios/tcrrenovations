/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // For App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx}" // ✅ Include components folder
  ],
  theme: {
    extend: {}
  },
  plugins: [],
};
