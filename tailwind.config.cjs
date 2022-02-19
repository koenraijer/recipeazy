const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui'), require('tailwindcss-fluid-type')],

	daisyui: {
		themes: [
			{'cupcake': {
				"primary": "#65c3c8",
				"primary-focus": "#42b2b8",
				"primary-content": "#ffffff",
				"secondary": "#ef9fbc",
				"secondary-focus": "#e8739e",
				"secondary-content": "#ffffff",
				"accent": "#eeaf3a",
				"accent-focus": "#e19914",
				"accent-content": "#ffffff",
				"neutral": "#291334",
				"neutral-focus": "#200f29",
				"neutral-content": "#ffffff",
				"base-100": "#fff",
				"base-200": "#efeae6",
				"base-300": "#e7e2df",
				"base-content": "#291334",
				"info": "#e0f2fe",
				"info-content": "#2563eb",
				"success": "#dcfce7",
				"success-content": "#16a34a",
				"warning": "#fef3c7",
				"warning-content": "#d97706",
				"error": "#fee2e2",
				"error-content": "#dc2626",
				"--border-color": "var(--b3)",
				"--rounded-box": "1rem",
				"--rounded-btn": "1.9rem",
				"--rounded-badge": "1.9rem",
				"--animation-btn": "0.25s",
				"--animation-input": ".2s",
				"--btn-text-case": "uppercase",
				"--btn-focus-scale": "0.95",
				"--navbar-padding": ".5rem",
				"--border-btn": "1px",
				"--tab-border": "2px",
				"--tab-radius": ".5rem",
			}}
		]
	}
}
module.exports = config;
