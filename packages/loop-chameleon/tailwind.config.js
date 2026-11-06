/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cham-bg': 'var(--cham-bg)',
        'cham-surface': 'var(--cham-surface)',
        'cham-surface-alt': 'var(--cham-surface-alt)',
        'cham-text': 'var(--cham-text)',
        'cham-muted': 'var(--cham-muted)',
        'cham-accent': 'var(--cham-accent)',
        'cham-highlight': 'var(--cham-highlight)',
        'cham-border': 'var(--cham-border)',
        'cham-tag-bg': 'var(--cham-tag-bg)',
        'cham-tag-text': 'var(--cham-tag-text)',
      },
      fontFamily: {
        headline: ['var(--cham-font-headline)', 'sans-serif'],
        body: ['var(--cham-font-body)', 'sans-serif'],
        mono: ['var(--cham-font-mono)', 'monospace'],
      },
      borderRadius: {
        cham: 'var(--cham-radius)',
      },
    },
  },
  plugins: [],
};
