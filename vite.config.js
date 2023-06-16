import path from 'path';
import { defineConfig } from 'vite';
import { eleventyPlugin } from './plugins/vite-plugin-eleventy';
import checkerPlugin from 'vite-plugin-checker';

export default defineConfig({
	root: 'src',
	base: '/',
	publicDir: '../public',
	plugins: [
		checkerPlugin({
			stylelint: {
				lintCommand: 'stylelint **/*.{css,scss,sass,less,styl,vue,svelte}',
			},
		}),
		eleventyPlugin({
			baseDir: '/',
		}),
	],

	appType: 'mpa',

	server: {
		port: '3000',
	},

	build: {
		outDir: '../dist/',
		assetsInlineLimit: 0,
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					let extType = path.extname(assetInfo.name);

					if (/css/.test(extType)) {
						extType = 'styles';
					}

					if (/jpg|jpeg|png|webp|svg|gif|avif/.test(extType)) {
						extType = 'images';
					}

					return `assets/${extType}/[name].[hash][extname]`;
				},
				chunkFileNames: 'assets/scripts/main.[hash].js',
				entryFileNames: 'assets/scripts/index.[hash].js',
			},
		},
		emptyOutDir: false,
		minify: true,
	},
});
