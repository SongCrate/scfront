/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{js,ts,jsx,tsx,mdx}',
  'node_modules/preline/dist/*.js'
];

export const theme = {
  colors: {
    'dark': {
      light: '#1f2937',
      DEFAULT: '#131c26',
      dark: '#0d141b'
    },
    
    'light': '#fff',
    'accent': '#51b5bb',

    'blue': '#1fb6ff',
    'purple': '#7e5bef',
    'pink': '#ff49db',
    'orange': '#ff7849',
    'green': '#13ce66',
    'yellow': '#ffc82c',
    'gray-dark': '#273444',
    'gray': '#8492a6',
    'gray-light': '#d3dce6',
    'red': '#ff0000'
  },
  extend: {},
};

export const plugins = [
  require('preline/plugin'),
];