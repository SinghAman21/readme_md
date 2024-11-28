/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["General Sans", "sans-serif"],
				display: ["Supreme", "sans-serif"],
				mono: ["Jetbrains Mono", "monospace"],
			},
			colors:{
				dark:"#0e0f10",
				light:"#eff6ff"
			}
		},
	},
	plugins: [],
};
