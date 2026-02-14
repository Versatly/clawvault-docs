/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './content/**/*.{md,mdx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/fumadocs-ui/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // ClawVault brand colors
        background: '#0d1826',
        foreground: '#f5f0e8',
        muted: {
          DEFAULT: '#121f2d',
          foreground: '#c4bca8',
        },
        popover: {
          DEFAULT: '#1a2744',
          foreground: '#f5f0e8',
        },
        card: {
          DEFAULT: '#1e2e47',
          foreground: '#f5f0e8',
        },
        border: 'rgba(245, 240, 232, 0.15)',
        input: 'rgba(245, 240, 232, 0.15)',
        primary: {
          DEFAULT: '#c9a227',
          foreground: '#0d1826',
        },
        secondary: {
          DEFAULT: '#1a2744',
          foreground: '#f5f0e8',
        },
        accent: {
          DEFAULT: 'rgba(201, 162, 39, 0.15)',
          foreground: '#c9a227',
        },
        destructive: {
          DEFAULT: '#ff5f57',
          foreground: '#f5f0e8',
        },
        vault: {
          deep: '#0d1826',
          surface: '#121f2d',
          elevated: '#1a2744',
          card: '#1e2e47',
        },
        memory: {
          gold: '#c9a227',
          amber: '#b8912a',
          light: '#d4b84a',
          cream: '#f5f0e8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { 
            opacity: '0.2',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.6',
            transform: 'scale(1.2)'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      },
      animation: {
        twinkle: 'twinkle 4s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
      }
    },
  },
};