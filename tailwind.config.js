/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}', './content/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Every colour is a CSS variable (see src/index.css) so dark mode is a
      // variable swap, not a second set of classes.
      colors: {
        sand: 'rgb(var(--sand) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        sage: {
          DEFAULT: 'rgb(var(--sage) / <alpha-value>)',
          soft: 'rgb(var(--sage-soft) / <alpha-value>)',
          deep: 'rgb(var(--sage-deep) / <alpha-value>)',
        },
        clay: {
          DEFAULT: 'rgb(var(--clay) / <alpha-value>)',
          soft: 'rgb(var(--clay-soft) / <alpha-value>)',
        },
        gold: { soft: 'rgb(var(--gold-soft) / <alpha-value>)' },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      borderRadius: { xl: '14px', '2xl': '20px', '3xl': '28px' },
      boxShadow: { card: '0 1px 2px rgb(43 42 39 / 0.04), 0 4px 16px rgb(43 42 39 / 0.04)' },
    },
  },
  plugins: [],
}
