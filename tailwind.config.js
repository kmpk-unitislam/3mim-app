/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom brand colors
        teal: {
          DEFAULT: '#024c44',
          light: '#0a6b5e',
          dark: '#013632',
        },
        mint: '#f0faf7',
        gold: {
          DEFAULT: '#d4a574',
          light: '#e8c9a0',
          dark: '#b88a5a',
        },
        'soft-green': '#4a9b8e',
        coral: '#e07a5f',
      },
      fontFamily: {
        display: ['Amiri', 'Noto Sans Arabic', 'serif'],
        body: ['Poppins', 'Noto Sans Arabic', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'card': '0 10px 40px rgba(2, 76, 68, 0.1)',
        'card-hover': '0 20px 60px rgba(2, 76, 68, 0.2)',
        'glow-gold': '0 0 20px rgba(212, 165, 116, 0.4)',
        'glow-gold-strong': '0 0 40px rgba(212, 165, 116, 0.8)',
        'glow-teal': '0 0 20px rgba(2, 76, 68, 0.3)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(2, 76, 68, 0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(2, 76, 68, 0.6)" },
        },
        "blink-glow": {
          "0%, 100%": { 
            opacity: "1", 
            boxShadow: "0 0 15px rgba(2, 76, 68, 0.4)",
            transform: "scale(1)"
          },
          "50%": { 
            opacity: "0.6", 
            boxShadow: "0 0 40px rgba(2, 76, 68, 0.9)",
            transform: "scale(1.05)"
          },
        },
        "title-glow": {
          "0%, 100%": { textShadow: "0 0 20px rgba(212, 165, 116, 0.3)" },
          "50%": { textShadow: "0 0 40px rgba(212, 165, 116, 0.6)" },
        },
        "scroll-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        "slide-in-left": "slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "blink-glow": "blink-glow 1.5s ease-in-out infinite",
        "title-glow": "title-glow 4s ease-in-out infinite",
        "scroll-bounce": "scroll-bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
