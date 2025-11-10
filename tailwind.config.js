/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vibrant Duolingo-inspired palette
        duo: {
          green: {
            50: '#e6f9f0',
            100: '#ccf3e1',
            200: '#99e7c3',
            300: '#66dba5',
            400: '#33cf87',
            500: '#58cc02', // Main Duolingo green
            600: '#46a302',
            700: '#357a01',
            800: '#235201',
            900: '#122900',
          },
          yellow: {
            50: '#fffdf0',
            100: '#fffae0',
            200: '#fff5c2',
            300: '#fff0a3',
            400: '#ffeb85',
            500: '#ffc800', // Bright yellow
            600: '#cca000',
            700: '#997800',
            800: '#665000',
            900: '#332800',
          },
          blue: {
            50: '#e6f4ff',
            100: '#cce9ff',
            200: '#99d3ff',
            300: '#66bdff',
            400: '#33a7ff',
            500: '#1cb0f6', // Bright blue
            600: '#168dc5',
            700: '#116a94',
            800: '#0b4762',
            900: '#062331',
          },
          pink: {
            50: '#ffe6f7',
            100: '#ffccef',
            200: '#ff99df',
            300: '#ff66cf',
            400: '#ff33bf',
            500: '#ff4b9e', // Bright pink
            600: '#cc3c7e',
            700: '#992d5f',
            800: '#661e3f',
            900: '#330f20',
          },
          purple: {
            50: '#f3e6ff',
            100: '#e6ccff',
            200: '#ce99ff',
            300: '#b566ff',
            400: '#9d33ff',
            500: '#ce82ff', // Bright purple
            600: '#a568cc',
            700: '#7c4e99',
            800: '#523466',
            900: '#291a33',
          },
          red: {
            50: '#ffe6e6',
            100: '#ffcccc',
            200: '#ff9999',
            300: '#ff6666',
            400: '#ff3333',
            500: '#ff4b4b', // Bright red for errors/hearts
            600: '#cc3c3c',
            700: '#992d2d',
            800: '#661e1e',
            900: '#330f0f',
          },
        },
        // Keep some original colors for compatibility
        primary: {
          500: '#58cc02',
          600: '#46a302',
          700: '#357a01',
        },
        success: {
          500: '#58cc02',
          600: '#46a302',
        },
        warning: {
          500: '#ffc800',
          600: '#cca000',
        },
        danger: {
          500: '#ff4b4b',
          600: '#cc3c3c',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Nunito', 'Poppins', 'system-ui', 'sans-serif'],
        bold: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(88, 204, 2, 0.4)',
        'glow-blue': '0 0 20px rgba(28, 176, 246, 0.4)',
        'glow-pink': '0 0 20px rgba(255, 75, 158, 0.4)',
        'button': '0 4px 0 0 rgba(0, 0, 0, 0.15)',
        'button-pressed': '0 2px 0 0 rgba(0, 0, 0, 0.15)',
        'card': '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'pop': 'pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'confetti': 'confetti 1s ease-out forwards',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(1000px) rotate(720deg)', opacity: '0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
}
