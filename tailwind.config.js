/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#F7F5F7",
        tertiary: "#01172A",
        textPrimary: "#000000", 
        textSecondary: "#FFFFFF",
        textTertiary: "B3B1B3",
        btnPrimary: "#01172A",
        btnSecondary: "#00376F"
      }
    },
    
  },
  plugins: [],
}

