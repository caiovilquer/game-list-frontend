/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      backgroundImage: {
        'hero-pattern': "url('/src/assets/bg-pattern.png')",
        'gradient-game': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      spacing: {
        '2.5': '0.625rem',  // Define px-2.5 and similar
        '1.5': '0.375rem',  // Define py-1.5 and similar
      },
    },
  },
  plugins: [],
}
