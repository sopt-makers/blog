const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
    },
    colors: {
      'black100': '#0F1010',
      'black80': '#1C1D1E',
      'black60': '#2C2D2E',
      'black40': '#3C3D40',
      'real-white': '#FFFFFF',
      'white100': '#FCFCFC',
      'gray100': '#606265',
      'gray80': '#808388',
      'gray60': '#989BA0',
      'gray40': '#C0C5C9',
      'gray30': '#CED1D2',
      'gray20': '#EEEFF1',
      'gray10': '#F7F8FA',
      'purple100': '#8040FF',
      'purple40': '#C6A9FF',
      'purpledim100': '#282039',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-suit)', ...defaultTheme.fontFamily.sans],
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
