import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "anarya-base": "#F8F9FA",
        "anarya-title": "#006A4B",
        "anarya-disabled": "#344767",

        // Status
        "anarya-status-draft": "#344767",

        // Button
        "anarya-btn-default": "#475569",
        "anarya-btn-success": "#006A4B",
        "anarya-btn-danger": "#BA1B1B",

        // Icon
        "anarya-bg-icon": "#E2E8F0",

        // Footer
        "anarya-footer": "#3A416F66",
        "anarya-footer-text": "#858F96",
        "anarya-footer-disable": "#d9d9d9",

        // Toast
        "anarya-toast-default": "#303C44",

        // Input
        "anarya-input-outer": "#E9AEDE",
        "anarya-input-disabled": "#EFF3F6",

        // Border
        "anarya-border-select": "#DDE3E7",
        "anarya-border-disabled": "#D2D6DA",

        // Navbar
        "anarya-navbar": "#3A416F",
        "anarya-navbar-separator": "#71839B",
        "anarya-navbar-title": "#344767",
        "anarya-navbar-inactive": "#3A416F99",

        // Table
        "anarya-table": "#667B94",
        "anarya-table-border": "#D1D9E2",
        "anarya-table-marker": "#C4FAE1",

        // Test
        "anarya-item-test": "#ECF9F3",
      },
      boxShadow: {
        layout: "0px 2px 16px 0px #0000000F;",
        cell: "0px 4px 16px 0px #0000000F;",
      },
      backgroundImage: {
        "gradient-green": "linear-gradient(90deg, #83E22F 0%, #40C033 100%)",
        "gradient-green/30": "linear-gradient(90deg, #83E22F 0%, #40C033 30%)",
        "gradient-red": "linear-gradient(90deg, #FB5567 0%, #F0242B 100%)",
        "gradient-red-hover": "linear-gradient(90deg, #FB5567 0%, #F0242B 50%)",
        "gradient-green-hover":
          "linear-gradient(90deg, #83E22F 0%, #40C033 50%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
