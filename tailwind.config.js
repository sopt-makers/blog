const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      mobile: '640px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-suit)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'blog-white': '#FCFCFC',
        'blog-gray10': '#F7F8FA',
        'blog-gray60': '#989BA0',
        'blog-black80': '#1C1D1E',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
