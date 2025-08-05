/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Healthcare dynamic classes
    'from-emerald-600', 'to-green-600', 'from-emerald-700', 'to-green-700',
    'from-pink-600', 'to-purple-600', 'from-pink-700', 'to-purple-700', 
    'from-blue-600', 'to-indigo-600', 'from-blue-700', 'to-indigo-700',
    'text-emerald-600', 'text-pink-600', 'text-blue-600', 
    'text-green-700', 'text-purple-700', 'text-indigo-700',
    'bg-emerald-600', 'bg-pink-600', 'bg-blue-600',
    'hover:from-emerald-700', 'hover:to-green-700',
    'hover:from-pink-700', 'hover:to-purple-700',
    'hover:from-blue-700', 'hover:to-indigo-700',
    // Layout classes
    'bg-gradient-to-r', 'bg-gradient-to-br', 'bg-gradient-to-l',
    'shadow-lg', 'shadow-xl', 'rounded-lg', 'rounded-xl', 'rounded-2xl',
    'p-4', 'p-6', 'p-8', 'px-4', 'px-6', 'px-8', 'py-2', 'py-4', 'py-6',
    'mb-4', 'mb-6', 'mb-8', 'mt-4', 'mt-6', 'mt-8',
    'text-white', 'text-gray-800', 'text-gray-600', 'text-gray-900',
    'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-200',
    'border', 'border-gray-200', 'border-gray-300',
    'flex', 'items-center', 'justify-center', 'space-x-2', 'space-x-4',
    'w-full', 'h-full', 'max-w-4xl', 'max-w-6xl', 'mx-auto',
    'grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'md:grid-cols-2', 'lg:grid-cols-3',
    'gap-4', 'gap-6', 'gap-8',
    'font-bold', 'font-semibold', 'font-medium',
    'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl',
    'transition-all', 'duration-200', 'duration-300',
    'hover:shadow-lg', 'hover:shadow-xl', 'hover:scale-105',
    'animate-pulse', 'animate-bounce',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        healthcare: {
          primary: '#0066cc',
          secondary: '#004499',
          accent: '#0080ff',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'healthcare': '0 4px 6px -1px rgba(0, 102, 204, 0.1), 0 2px 4px -1px rgba(0, 102, 204, 0.06)',
      },
    },
  },
  plugins: [],
}