/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}', './content/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Every colour is a CSS variable (see src/index.css) so dark mode is a
      // variable swap, not a second set of classes. `tint` follows whichever
      // tint-* class is nearest above the element.
      colors: {
        sand: 'rgb(var(--sand) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        tint: {
          DEFAULT: 'rgb(var(--tint) / <alpha-value>)',
          soft: 'rgb(var(--tint-soft) / <alpha-value>)',
          deep: 'rgb(var(--tint-deep) / <alpha-value>)',
        },
        sage: {
          DEFAULT: 'rgb(var(--sage) / <alpha-value>)',
          soft: 'rgb(var(--sage-soft) / <alpha-value>)',
          deep: 'rgb(var(--sage-deep) / <alpha-value>)',
        },
        clay: {
          DEFAULT: 'rgb(var(--clay) / <alpha-value>)',
          soft: 'rgb(var(--clay-soft) / <alpha-value>)',
          deep: 'rgb(var(--clay-deep) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
          soft: 'rgb(var(--gold-soft) / <alpha-value>)',
          deep: 'rgb(var(--gold-deep) / <alpha-value>)',
        },
        mist: {
          DEFAULT: 'rgb(var(--mist) / <alpha-value>)',
          soft: 'rgb(var(--mist-soft) / <alpha-value>)',
          deep: 'rgb(var(--mist-deep) / <alpha-value>)',
        },
        dusk: {
          DEFAULT: 'rgb(var(--dusk) / <alpha-value>)',
          soft: 'rgb(var(--dusk-soft) / <alpha-value>)',
          deep: 'rgb(var(--dusk-deep) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      // The type scale, phone first. Serif for headings, sans for everything
      // she reads at length; line heights are generous for Vietnamese
      // diacritics.
      fontSize: {
        display: ['34px', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        title: ['28px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        heading: ['22px', { lineHeight: '1.2' }],
        'body-lg': ['17px', { lineHeight: '1.55' }],
        body: ['15px', { lineHeight: '1.5' }],
        caption: ['13px', { lineHeight: '1.45' }],
        eyebrow: ['11px', { lineHeight: '1.3', letterSpacing: '0.12em' }],
      },
      borderRadius: { lg: '12px', xl: '16px', '2xl': '22px', '3xl': '28px', '4xl': '36px' },
      boxShadow: {
        card: '0 1px 2px rgb(43 42 39 / 0.03), 0 8px 24px rgb(43 42 39 / 0.05)',
        float: '0 10px 28px rgb(var(--tint-deep) / 0.22)',
        up: '0 -8px 24px rgb(43 42 39 / 0.06)',
        none: 'none',
      },
      spacing: { 4.5: '18px', 13: '52px', 15: '60px', 18: '72px' },
    },
  },
  plugins: [],
}
