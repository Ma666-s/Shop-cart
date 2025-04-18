/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode : 'class',
  content: ["./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(to bottom, #051937, #08223e, #102c44, #19354a, #233f50)',
        'ocean-gradient-dark': 'linear-gradient(to bottom, #0a1f3a, #12253f, #182b44, #1f3249, #25384e)'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

