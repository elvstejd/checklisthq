/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)']
      }
    },
    animation: {
      enter: 'slideInBottom 300ms cubic-bezier(0.39,0.57,0.56,1)',
      leave: 'slideOutBottom 300ms cubic-bezier(0.65,0.05,0.36,1) forwards',
      spin: 'spin 2s linear infinite'
    },
    keyframes: {
      slideInBottom: {
        '0%': {
          transform: 'translateY(150%)',
        },
        '100%': {
          transform: 'translateY(0)',
        },
      },
      slideOutBottom: {
        '0%': {
          opacity: "1",
          transform: 'translateY(0)',
        },
        '100%': {
          opacity: "0",
          transform: 'translateY(150%)',
        },
      },
      spin: {
        '0%': {
          transform: "rotate(0deg)"
        },
        '100%': {
          transform: "rotate(360deg)"
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
