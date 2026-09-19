/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: '#f5f2eb',
        'sand-deep': '#ece7db',
        charcoal: '#1a1a1a',
        'charcoal-soft': '#26261f',
        terracotta: '#c27d60',
        'terracotta-deep': '#a9634a',
        bone: '#faf9f6',
        ink: '#3d3d38',
        line: '#e4dfd3',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
