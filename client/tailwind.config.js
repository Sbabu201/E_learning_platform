/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        customColor: 'rgb(41, 48, 59)', // Define custom color with your RGB values
      },
    },
    fontFamily: {
      'italianno': ['"Italianno"', 'cursive']
    }
  },
  plugins: [],
}

