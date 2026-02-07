/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",      // App Router
    "./pages/**/*.{ts,tsx}",    // Pages Router
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
