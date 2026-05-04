import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    950: "#040d24",
                    900: "#071038",
                    800: "#0d1a52",
                    700: "#132070",
                },
                gold: {
                    300: "#fde06a",
                    400: "#f5c200",
                    500: "#d4a800",
                },
            },
            fontFamily: {
                display: ["var(--font-barlow-condensed)", "sans-serif"],
                body: ["var(--font-barlow)", "sans-serif"],
            },
            animation: {
                blink: "blink 1.2s ease-in-out infinite",
                "fade-up": "fadeUp 0.6s ease forwards",
                "spin-slow": "spinSlow 20s linear infinite",
                "spin-slower": "spinSlower 30s linear infinite",
                "pulse-glow": "pulseGlow 3s ease-in-out infinite",
            },
            keyframes: {
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.15" },
                },
                fadeUp: {
                    from: { opacity: "0", transform: "translateY(16px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                spinSlow: {
                    to: { transform: "rotate(360deg)" },
                },
                spinSlower: {
                    to: { transform: "rotate(-360deg)" },
                },
                pulseGlow: {
                    "0%, 100%": { opacity: "0.15" },
                    "50%": { opacity: "0.3" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
