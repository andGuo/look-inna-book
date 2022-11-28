/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkPrimary: '#44475a',
        darkSecondary: '#282a36',
        darkText: '#f8f8f2',
        draculaPink: '#ff79c6',
        draculaPurple: '#bd93f9',
        draculaCyan: '#8be9fd',
        draculaYellow: '#f1fa8c',
        draculaGreen: '#50fa7b',
        draculaRed: '#ff5555',
        lightPrimary: '#1f3855',
        lightSecondary: '#f7f2ea', 
        lightText: '#414756' 
      }
    },
  },
  plugins: [],
}
