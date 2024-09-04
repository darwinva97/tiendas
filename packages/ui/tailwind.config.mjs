import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "../../packages/ui/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  darkMode: "false",
  prefix: "",
  theme: {
    fontSize: {
      xs: "0.85rem",
      sm: "0.9rem",
      base: "1.15rem",
      lg: "1.3rem",
      xl: "1.5rem",
      "2xl": "1.7rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        xl: "1.8rem",
        "2xl": "2rem",
      },
      screens: {
        "lg": "1240px",
        "xl": "1360px",
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        "raleway": ["Raleway", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
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
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        ebony: '#252525',
        'deep-sea-blue': '#00335e',
        charcoal: '#333333',
        'charcoal-smoke': '#33333366',
        'ocean-blue': '#004d8e',
        'royal-blue': '#005be2',
        'sky-blue': '#0080ec',
        'burnt-orange': '#ff5925',
        'ash-gray': '#b1a9a1',
        'soft-silver': '#e8e8e8',
        'frost-white': '#f4faff',
        'turquoise-blue': '#00bc9e',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    typography,
    require("@tailwindcss/forms"),
    // require("preline/plugin"),
    require("tailwindcss-animate"),
  ],
};
