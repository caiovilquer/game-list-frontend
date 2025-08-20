/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-primary': '#6d28d9',      // Purple shade for primary elements
        'game-secondary': '#10b981',    // Green for accents
        'game-dark': '#111827',         // Dark background
        'game-light': '#f3f4f6',        // Light text/background
        'game-accent': '#f59e0b',       // Orange accent
        'game-danger': '#ef4444',       // Red for alerts/errors
      },
      fontFamily: {
        'game': ['"Press Start 2P"', 'cursive'],
        'title': ['"Orbitron"', 'sans-serif'],
        'body': ['"Exo 2"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/bg-pattern.png')",
        'gradient-game': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #6d28d9, 0 0 10px #6d28d9' },
          '50%': { boxShadow: '0 0 20px #6d28d9, 0 0 30px #6d28d9' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 2s infinite',
        glow: 'glow 1.5s ease-in-out infinite',
      },
      boxShadow: {
        'neon': '0 0 5px #6d28d9, 0 0 10px #6d28d9, 0 0 15px #6d28d9',
        'glow': '0 0 10px rgba(109, 40, 217, 0.7)',
      },
    },
  },
  plugins: [],
}