/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        soft: '0 20px 80px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        surface: '#f8fafc',
        surface2: '#eef2ff',
        border: '#e2e8f0',
        primary: '#4338ca',
        primaryDark: '#3730a3',
        accent: '#9333ea',
        muted: '#64748b',
      }
    },
  },
  plugins: [],
};
