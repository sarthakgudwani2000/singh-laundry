/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
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
        /* WordPress (singhlaundry) live site: buttons/links #3b79c9, headings #1a3b6e, top bar #2b6cb0, page tint #f0f7ff */
        blue: {
          50: "#f0f7ff",
          100: "#dceeff",
          200: "#b9dcf8",
          300: "#8ac4ef",
          400: "#5ca6e5",
          500: "#3b79c9",
          600: "#2b6cb0",
          700: "#245a96",
          800: "#1a3b6e",
          900: "#15325f",
          950: "#0f2447",
        },
        sky: {
          300: "#b8dcfc",
          400: "#8ec5f7",
          500: "#5aa8e8",
        },
        indigo: {
          500: "#2f5a9e",
          600: "#1a3b6e",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
