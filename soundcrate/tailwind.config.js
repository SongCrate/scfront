/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{js,ts,jsx,tsx,mdx}',
  'node_modules/preline/dist/*.js'
];

export const theme = {
  colors: {
    'dark': '#131c26',
    'dark-100': '#1f2937',
    'light': '#f9f6f4',
    'accent': '#9ad4d6',

    'blue': '#1fb6ff',
    'purple': '#7e5bef',
    'pink': '#ff49db',
    'orange': '#ff7849',
    'green': '#13ce66',
    'yellow': '#ffc82c',
    'gray-dark': '#273444',
    'gray': '#8492a6',
    'gray-light': '#d3dce6',
  },
  extend: {},
};

export const plugins = [
  require('preline/plugin'),
];