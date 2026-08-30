/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F5233',
          light: '#3E6B43',
          dark: '#243D27',
          50: '#F0F4F1',
          100: '#DCE6DF',
        },
        accent: {
          DEFAULT: '#D98E27',
          light: '#E8A94E',
          dark: '#B5741D',
          50: '#FBF3E6',
        },
        'page-bg': '#FAF6EF',
        'card-bg': '#FFFFFF',
        'pill-bg': '#F0E6D6',
        'pill-text': '#5A4A36',
        ink: '#2B2B2B',
        'ink-soft': '#6B6B6B',
        'track': '#E5E0D8',
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
      },
      boxShadow: {
        card: '0 4px 16px -4px rgba(47, 82, 51, 0.10), 0 2px 6px -2px rgba(47, 82, 51, 0.06)',
        row: '0 1px 3px rgba(47, 82, 51, 0.08)',
      },
    },
  },
  plugins: [],
};
