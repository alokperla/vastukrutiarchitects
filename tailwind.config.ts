import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A56DB', // placeholder derived from logo
        secondary: '#F59E0B',
        accent: '#10B981',
        background: '#F9FAFB',
      },
    },
  },
  plugins: [],
};

export default config;
