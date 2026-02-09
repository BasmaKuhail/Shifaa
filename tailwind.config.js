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
            "blue-800": "#174356",
            "blue-700": "#1E576F",
            "blue-600": '#174356',
            "blue-500": '#2A7A9D',
            "blue-400": '#5595B1',
            "blue-300": '#70A6BD',
            "blue-200": '#99D4EE',
            "blue-100": '#E5F7FF',
            "blue-50": '#FFFFFF',
            textInputCorrect: '#1A71F6',
            textInputWrong: '#FF1F1F',
        },
        fontSize: {
            'xxs': '0.563rem',
            'xs': '0.750rem',
            'sm': '1rem',
            'md': '1.313rem',
            'lg': '1.688rem',
            'xl': '2.250rem',  
            'xxl': '2.938rem',  
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
