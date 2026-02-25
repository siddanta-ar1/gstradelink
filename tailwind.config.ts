import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Core Green Palette ──────────────────────────────────────────────
        primary: {
          50: "#EFF4EE", // Soft sage tint – very light card bg
          100: "#D4E3D2", // Light sage
          200: "#B8CEB5", // Medium sage
          300: "#9BB898", // Soft sage
          400: "#89A083", // Sage / Olive Green (hero lighter bg)
          500: "#6B8B66", // Mid forest
          600: "#2A4835", // Deep Forest Green (main brand)
          700: "#1E3527", // Darker forest
          800: "#14231A", // Very dark forest
          900: "#0C1810", // Near-black forest
          950: "#070E09",
        },

        // ── Neutrals ────────────────────────────────────────────────────────
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

        // ── Brand Semantic Tokens ───────────────────────────────────────────
        brand: {
          primary: "#2A4835",       // Deep Forest Green
          secondary: "#1E3527",     // Darker Forest
          sage: "#89A083",         // Soft Sage / Olive
          light: "#EFF4EE",         // Sage tint bg
          accent: "#F2C047",        // Mustard Gold
          warm: "#D97A35",        // Burnt Orange / Terracotta
          surface: "#F0F2EE",       // Warm Off-White / Alabaster
          canvas: "#E8EBE3",       // Main catalogue bg
        },

        // ── Accent ──────────────────────────────────────────────────────────
        accent: {
          50: "#FEFBEA",
          100: "#FDF3C3",
          200: "#FCE68A",
          300: "#F9D455",
          400: "#F2C047", // Mustard Gold
          500: "#E8A822",
          600: "#D97A35", // Terracotta / Buy button accent
          700: "#B85C1A",
          800: "#8F420D",
          900: "#6B2F08",
        },

        // ── Background Hierarchy ────────────────────────────────────────────
        background: {
          primary: "#F0F2EE",   // Warm off-white / Alabaster
          secondary: "#E8EBE3", // Canvas – main page bg
          tertiary: "#D4E3D2", // Sage tint
          inverse: "#1E3527",  // Dark forest
          card: "#FFFFFF",      // Pure white – card surfaces
        },

        // ── Text Hierarchy ──────────────────────────────────────────────────
        foreground: {
          primary: "#111111", // Jet Black / Deep Charcoal
          secondary: "#888888", // Medium Grey
          tertiary: "#AAAAAA", // Light grey
          inverse: "#FFFFFF",
          muted: "#C0C0C0",
        },

        // ── Border System ────────────────────────────────────────────────────
        border: {
          primary: "#D4E3D2", // Sage light border
          secondary: "#B8CEB5",
          tertiary: "#89A083",
        },

        // ── Semantic Status ──────────────────────────────────────────────────
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
      },

      // Typography Scale
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.025em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.01em" }],
        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.015em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.025em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.03em" }],
        "5xl": ["3rem", { lineHeight: "3.25rem", letterSpacing: "-0.035em" }],
        "6xl": ["3.75rem", { lineHeight: "4rem", letterSpacing: "-0.04em" }],
        "7xl": ["4.5rem", { lineHeight: "4.75rem", letterSpacing: "-0.045em" }],
      },

      // Spacing System
      spacing: {
        "0.5": "0.125rem",
        "1": "0.25rem",
        "1.5": "0.375rem",
        "2": "0.5rem",
        "2.5": "0.625rem",
        "3": "0.75rem",
        "3.5": "0.875rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
        "11": "2.75rem",
        "12": "3rem",
        "14": "3.5rem",
        "16": "4rem",
        "18": "4.5rem",
        "20": "5rem",
        "24": "6rem",
        "28": "7rem",
        "32": "8rem",
        "36": "9rem",
        "40": "10rem",
        "44": "11rem",
        "48": "12rem",
        "52": "13rem",
        "56": "14rem",
        "60": "15rem",
        "64": "16rem",
        "72": "18rem",
        "80": "20rem",
        "96": "24rem",
      },

      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        DEFAULT: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "0 0 #0000",
        soft: "0 2px 8px 0 rgb(0 0 0 / 0.06)",
        card: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px 0 rgb(0 0 0 / 0.06)",
        "card-hover": "0 4px 12px 0 rgb(0 0 0 / 0.12), 0 2px 6px 0 rgb(0 0 0 / 0.08)",
        button: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "button-hover": "0 2px 4px 0 rgb(0 0 0 / 0.1)",
        green: "0 8px 24px -4px rgb(42 72 53 / 0.35)",
      },

      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        full: "9999px",
      },

      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "fade-down": "fadeDown 0.5s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-up": "scaleUp 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-subtle": "bounceSubtle 2s infinite",
        float: "float 6s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeDown: { "0%": { opacity: "0", transform: "translateY(-10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideUp: { "0%": { transform: "translateY(10px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        slideDown: { "0%": { transform: "translateY(-10px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        scaleUp: { "0%": { transform: "scale(0.95)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        shimmer: { "0%": { backgroundPosition: "-200px 0" }, "100%": { backgroundPosition: "calc(200px + 100%) 0" } },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" },
          "50%": { transform: "translateY(-5px)", animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(-4px) rotate(-1deg)" },
        },
      },

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

      gridTemplateColumns: {
        "auto-fit-xs": "repeat(auto-fit, minmax(200px, 1fr))",
        "auto-fit-sm": "repeat(auto-fit, minmax(250px, 1fr))",
        "auto-fit-md": "repeat(auto-fit, minmax(300px, 1fr))",
        "auto-fit-lg": "repeat(auto-fit, minmax(350px, 1fr))",
        sidebar: "280px 1fr",
        dashboard: "64px 1fr",
      },

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

      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "40px",
      },

      transitionDuration: {
        "50": "50ms", "100": "100ms", "150": "150ms",
        "200": "200ms", "250": "250ms", "300": "300ms",
        "400": "400ms", "500": "500ms",
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
