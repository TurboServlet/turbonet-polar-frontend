/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,vue}",
        "./src/App.vue",
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ["light", "dark"],
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui'),
    ],
}