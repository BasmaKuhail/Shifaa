/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",      // App Router
    "./pages/**/*.{ts,tsx}",    // Pages Router
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Tajawal', 'ui-sans-serif', 'system-ui'],
        },
        colors: {
            foreground: 'var(--foreground)',
            petrolBlue: '#2A7A9D',
             lightBlue: '#BDD6E1',
        },
        backgroundColor: {
            background: 'var(--lightBlue)',
        },
        borderRadius: {
            'normal': '10px',
        },
    },
  },
  plugins: [],
}
