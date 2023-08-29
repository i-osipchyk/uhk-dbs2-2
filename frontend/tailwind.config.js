/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // #782b20 - lighter login page border
        mainOrange: '#D14836',
        darkerOrange: '#531D16',
      },
      boxShadow: {
        loginPage: '0 0 5px 3px rgba(0,0,0,0.15)',
        lightShadow: '0 0 10px 3px rgba(255,255,255,0.1)',
        blackShadow: '0 0 3px 2px rgb(150,150,150)',
        mainOrangeShadow: '0 0 3px 2px #D14836',
        darkerOrangeShadow: '0 0 3px 2px #531D16',
        bottomShadow: '0 4px 2px -2px rgba(0,0,0,0.2);',
      },
    },
  },
  plugins: [],
}
