/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './App.tsx',
    './main.tsx',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          navy: '#1E3A5F',
          greige: '#CFC8BE',
          white: '#FFFFFF',
          lightGray: '#E5E7EB',
          charcoal: '#374151',
        },
        navy: {
          DEFAULT: '#1E3A5F',
          50: '#F0F4F8',
          100: '#DDE7F1',
          200: '#B8CFE2',
          300: '#8FB4D2',
          400: '#5A90BD',
          500: '#326E9F',
          600: '#23527C',
          700: '#1E3A5F', // Palette Navy Blue
          800: '#162C49',
          900: '#0F1E33',
          950: '#09121F',
        },
        greige: {
          DEFAULT: '#CFC8BE',
          50: '#FAF9F8',
          100: '#F4F2EE',
          200: '#E8E4DD',
          300: '#DDD6CB',
          400: '#CFC8BE', // Palette Greige
          500: '#BDB3A6',
          600: '#A49888',
          700: '#837868',
          800: '#62594D',
          900: '#433D34',
          950: '#25211C',
        },
        charcoal: {
          DEFAULT: '#374151',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB', // Palette Light Gray
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151', // Palette Charcoal
          800: '#1F2937',
          900: '#111827',
          950: '#0B0F17',
        },
        // Map default utility colors to harmonize with palette
        blue: {
          50: '#F0F4F8',
          100: '#DDE7F1',
          200: '#B8CFE2',
          300: '#8FB4D2',
          400: '#5A90BD',
          500: '#2A5C8E',
          600: '#1E3A5F', // Navy Blue
          700: '#183152',
          800: '#12243C',
          900: '#0E1A2C',
          950: '#08101C',
        },
        purple: {
          50: '#FAF9F8',
          100: '#F4F2EE',
          200: '#E8E4DD',
          300: '#DDD6CB',
          400: '#CFC8BE', // Greige
          500: '#BDB3A6',
          600: '#2E4C73',
          700: '#1E3A5F',
          800: '#162C49',
          900: '#0F1E33',
          950: '#09121F',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB', // Light Gray
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151', // Charcoal
          800: '#1F2937',
          900: '#111827',
          950: '#0B0F17',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
