const coreConfig = require('../../packages/core/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [coreConfig],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/core/src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
};
