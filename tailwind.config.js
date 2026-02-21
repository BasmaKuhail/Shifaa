/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./pages/**/*.{ts,tsx}",    // Pages Router
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Tajawal', 'ui-sans-serif', 'system-ui'],
        },
        colors: {
          blue:{
            800: '#174356',
            700: '#1E576F',
            600: '#174356',
            500: '#2A7A9D', // petrol blue
            400: '#5595B1',
            300: '#70A6BD', 
            200: '#99D4EE',
            100: '#E5F7FF',
            50: '#FFFFFF',
          },
          black: {
            500: "#727272", //text gray
            200:"#C9C9C9", //border gray
            100: "#F6F6F6", //input background gray
          },
            textInputCorrect: '#1A71F6',
            textInputWrong: '#FF1F1F',
            online: '#23A149', //green
            red: "#EA3030",
        },
        fontSize: {
            'xxs': '0.563rem',
            'xs': '0.625rem', //10px
            'sm': '1rem', // 16px
            'md': '1.313rem',
            'lg': '1.5rem', // 24px
            'xl': '2.250rem',  
            'xxl': '2.938rem',
            '12px': '0.75rem', //12px
            'inpt': '0.875rem', //14px
            'title': '2.25rem', //36px
            'btn': "1.125rem", //18px
        },
        backgroundColor: {
            lightBlue: "#BDD6E1",
            white: "#FFFFFF",
        },
        borderRadius: {
            'sm': '5px',
            'normal': '10px',
            'btn': '999px',
            'inpt': '12px',
        },
    },
  },
  plugins: [],
}
