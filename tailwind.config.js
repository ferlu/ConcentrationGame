/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontSize: {
				sm: "0.8rem",
				base: "1rem",
				xl: "1.25rem",
				"2xl": "1.563rem",
				"3xl": "1.953rem",
				"4xl": "2.441rem",
				"5xl": "3.052rem",
			},
			colors: {
				nord: {
					0: "#2E3440",
					1: "#3B4252",
					2: "#434C5E",
					3: "#4C566A",
					4: "#D8DEE9",
					5: "#E5E9F0",
					6: "#ECEFF4",
					7: "#8FBCBB",
					8: "#88C0D0",
					9: "#81A1C1",
					10: "#5E81AC",
					11: "#BF616A",
					12: "#D08770",
					13: "#EBCB8B",
					14: "#A3BE8C",
					15: "#B48EAD",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
