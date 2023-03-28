const postcssCustomProperties = require('postcss-custom-properties');
module.exports = {
	plugins: [
		require('postcss-import'),
		postcssCustomProperties({
			preserve: false,
		}),
		/* require('calcFunction'), */
		/* require('postcss-minify'), */
	]
}
