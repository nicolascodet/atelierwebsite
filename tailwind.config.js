/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        'primary': '#000000',
        'secondary': '#333333',
        'accent': '#3b82f6',
        'background': '#ffffff',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
