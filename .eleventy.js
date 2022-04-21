const path = require('path');

const { lintHtml } = require('./11ty/linters');
const { formatHtml } = require('./11ty/transforms');
const config = require('./config');

module.exports = (eleventyConfig) => {

	// Eleventy2.0 では削除される設定方法のため注意
	eleventyConfig.setBrowserSyncConfig({
		files: "dist/assets/"
	});

	eleventyConfig.addLinter('lint-html', lintHtml);

	eleventyConfig.addTransform('format-html', formatHtml);

	return {
		dir: {
			input: path.join(config.get('srcDir'), 'templates'),
			output: path.join(config.get('distDir'), config.get('publicPath')),
		},
		pathPrefix: config.get('publicPath'),
	};
};
