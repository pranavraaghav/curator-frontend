module.exports = {
  mode : 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'noto-sans' : ['"Noto Sans"', 'sans-serif'],
        'noto-serif' : ['"Noto Serif"', 'serif']
      },
      colors:{
        primary: '#324376',
        secondary: '',
        bg: '#F0F0F0',
        hover: '#F0F0F0',
        block: '#FFFFFF',
      },
      spacing:{
        'expanded' : '28.25rem', //sidebar
        'folded': '8.75rem'
      }
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
