const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      // Custom aurora accent color utilities
      auroraAccent: {
        '.aurora-blue': {
          '--aurora': 'repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)',
        },
        '.aurora-purple': {
          '--aurora': 'repeating-linear-gradient(100deg,var(--purple-500)_10%,var(--pink-400)_15%,var(--fuchsia-400)_20%,var(--violet-300)_25%,var(--purple-400)_30%)',
        },
        '.aurora-cyan': {
          '--aurora': 'repeating-linear-gradient(100deg,var(--cyan-400)_10%,var(--teal-300)_15%,var(--blue-200)_20%,var(--emerald-200)_25%,var(--cyan-300)_30%)',
        },
        '.aurora-orange': {
          '--aurora': 'repeating-linear-gradient(100deg,var(--orange-500)_10%,var(--red-400)_15%,var(--amber-400)_20%,var(--yellow-300)_25%,var(--orange-400)_30%)',
        },
        '.aurora-green': {
          '--aurora': 'repeating-linear-gradient(100deg,var(--green-500)_10%,var(--emerald-400)_15%,var(--lime-400)_20%,var(--teal-300)_25%,var(--green-300)_30%)',
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
    // Plugin to add aurora accent color utilities
    function ({ addUtilities, theme }) {
      const accent = theme('auroraAccent') || {};
      addUtilities(accent, ['responsive']);
    },
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

