const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('@tailwindcss/typography', 'flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			fontFamily: {
				comfortaa: 'Comfortaa Variable, sans-serif',
				playfair: 'Playfair Display Variable, sans-serif',
				permanent: 'Permanent Marker, sans-serif'
			},
			colors: {
				// sky
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e'
				}
			}
		}
	}
}

module.exports = config
