import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Primary Palette
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },

        // Brand Colors - Refined & Professional
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // Main brand blue
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },

        // Accent Colors - Minimal & Purposeful
        accent: {
          50: "#fefce8",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // Warm amber for CTAs
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },

        // Semantic Colors
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },

        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },

        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },

        // Background Hierarchy
        background: {
          primary: "#ffffff",
          secondary: "#f8fafc",
          tertiary: "#f1f5f9",
          inverse: "#0f172a",
        },

        // Text Hierarchy
        foreground: {
          primary: "#0f172a",
          secondary: "#475569",
          tertiary: "#64748b",
          inverse: "#ffffff",
          muted: "#94a3b8",
        },

        // Border System
        border: {
          primary: "#e2e8f0",
          secondary: "#cbd5e1",
          tertiary: "#94a3b8",
        },
      },

      // Typography Scale - Professional & Consistent
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.025em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.01em" }],
        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.015em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
        "3xl": [
          "1.875rem",
          { lineHeight: "2.25rem", letterSpacing: "-0.025em" },
        ],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.03em" }],
        "5xl": ["3rem", { lineHeight: "3.25rem", letterSpacing: "-0.035em" }],
        "6xl": ["3.75rem", { lineHeight: "4rem", letterSpacing: "-0.04em" }],
        "7xl": ["4.5rem", { lineHeight: "4.75rem", letterSpacing: "-0.045em" }],
        "8xl": ["6rem", { lineHeight: "6rem", letterSpacing: "-0.05em" }],
        "9xl": ["8rem", { lineHeight: "8rem", letterSpacing: "-0.055em" }],
      },

      // Spacing System - 4px base unit
      spacing: {
        "0.5": "0.125rem", // 2px
        "1": "0.25rem", // 4px
        "1.5": "0.375rem", // 6px
        "2": "0.5rem", // 8px
        "2.5": "0.625rem", // 10px
        "3": "0.75rem", // 12px
        "3.5": "0.875rem", // 14px
        "4": "1rem", // 16px
        "5": "1.25rem", // 20px
        "6": "1.5rem", // 24px
        "7": "1.75rem", // 28px
        "8": "2rem", // 32px
        "9": "2.25rem", // 36px
        "10": "2.5rem", // 40px
        "11": "2.75rem", // 44px
        "12": "3rem", // 48px
        "14": "3.5rem", // 56px
        "16": "4rem", // 64px
        "18": "4.5rem", // 72px
        "20": "5rem", // 80px
        "24": "6rem", // 96px
        "28": "7rem", // 112px
        "32": "8rem", // 128px
        "36": "9rem", // 144px
        "40": "10rem", // 160px
        "44": "11rem", // 176px
        "48": "12rem", // 192px
        "52": "13rem", // 208px
        "56": "14rem", // 224px
        "60": "15rem", // 240px
        "64": "16rem", // 256px
        "72": "18rem", // 288px
        "80": "20rem", // 320px
        "96": "24rem", // 384px
      },

      // Professional Shadow System
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        DEFAULT:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "0 0 #0000",

        // Custom professional shadows
        soft: "0 2px 8px 0 rgb(0 0 0 / 0.06)",
        card: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px 0 rgb(0 0 0 / 0.06)",
        "card-hover":
          "0 4px 12px 0 rgb(0 0 0 / 0.12), 0 2px 6px 0 rgb(0 0 0 / 0.08)",
        button: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "button-hover": "0 2px 4px 0 rgb(0 0 0 / 0.1)",
      },

      // Border Radius System
      borderRadius: {
        none: "0",
        sm: "0.125rem", // 2px
        DEFAULT: "0.25rem", // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        xl: "0.75rem", // 12px
        "2xl": "1rem", // 16px
        "3xl": "1.5rem", // 24px
        full: "9999px",
      },

      // Animation System - Subtle & Professional
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "fade-down": "fadeDown 0.5s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-up": "scaleUp 0.2s ease-out",
        "scale-down": "scaleDown 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-subtle": "bounceSubtle 2s infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleDown: {
          "0%": { transform: "scale(1.05)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "calc(200px + 100%) 0" },
        },
        bounceSubtle: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-5px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },

      // Container System
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
          "2xl": "3rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1400px",
        },
      },

      // Grid System
      gridTemplateColumns: {
        "auto-fit-xs": "repeat(auto-fit, minmax(200px, 1fr))",
        "auto-fit-sm": "repeat(auto-fit, minmax(250px, 1fr))",
        "auto-fit-md": "repeat(auto-fit, minmax(300px, 1fr))",
        "auto-fit-lg": "repeat(auto-fit, minmax(350px, 1fr))",
        sidebar: "280px 1fr",
        dashboard: "64px 1fr",
        "dashboard-expanded": "280px 1fr",
      },

      // Z-Index System
      zIndex: {
        "1": "1",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
        dropdown: "100",
        modal: "200",
        popover: "300",
        tooltip: "400",
        notification: "500",
        max: "999",
      },

      // Backdrop Blur
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "40px",
      },

      // Professional Transitions
      transitionDuration: {
        "50": "50ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
      },

      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "ease-smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "ease-swift": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};

export default config;
