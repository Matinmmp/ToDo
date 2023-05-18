/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./assets/**/*.{html,js}"],

    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["cupcake", "night", "cmyk"],
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "night",
    },
}

