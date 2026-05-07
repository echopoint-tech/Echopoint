/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-dark': '#050a14',
        'bg-card': '#0f172a',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'primary-accent': '#3b82f6',
        'tech-cyan': '#06b6d4',
        'human-blue': '#3b82f6',
        'error-red': '#ef4444',
        'success-green': '#22c55e',
      },
      fontFamily: {
        'main': ['var(--font-main)', 'sans-serif'],
        'display': ['var(--font-display)', 'sans-serif'],
      },
      transitionDuration: {
        'fast': '0.3s',
        'smooth': '0.8s',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      backgroundImage: {
        'gradient-fusion': 'linear-gradient(135deg, var(--tech-cyan), var(--human-blue))',
      },
      boxShadow: {
        'tech-glow': '0 4px 15px rgba(6, 182, 212, 0.2)',
        'tech-glow-lg': '0 12px 30px rgba(6, 182, 212, 0.5)',
      },
    },
  },
}
