const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

module.exports = {
	purge: {
		content: [
			"./src/**/*.html",
			"./src/**/*.svelte",
		],
		options: {
			defaultExtractor: (content) => [
				// This is an internal Tailwind function that we're not supposed to be allowed to use
				// So if this stops working, please open an issue at
				// https://github.com/babichjacob/sapper-postcss-template/issues
				// rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
			],
			keyframes: true,
		},
	},
	theme: {
		extend: {
			// Background Color
			backgroundColor: {
				'icon-button': '#262b3f',

				'input': '#0d0f17',
				'container': '#151820'
			},

			// Padding
			padding: {
				"10%": "10%",
				"20%": "20%",
				"30%": "30%",
				"35%": "35%",
				"40%": "40%",
				"45%": "45%",
				"50%": "50%",
				"60%": "60%",
				"70%": "70%",
				"75%": "75%",
				"80%": "80%",
				"90%": "90%",
				"100%": "100%"
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
