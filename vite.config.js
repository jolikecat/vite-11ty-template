const path = require('path');
import { defineConfig } from "vite";
import { eleventyPlugin } from "./plugins/vite-plugin-eleventy";

export default defineConfig({
    root: 'src',
    base: '/',
    publicDir: '../public',
    plugins: [eleventyPlugin({
        baseDir: '/'
    })],
    css: {
        postcss: {
            plugins: [require("autoprefixer")],
        },
    },
    appType: 'mpa',

    server: {
        port: '3000'
    },

    build: {
        outDir: '../dist/',
        assetsInlineLimit: 0,
        rollupOptions: {
            output: {
                assetFileNames: assetInfo => {
                    let extType = path.extname(assetInfo.name);

                    if (/css/.test(extType)) {
                        extType = 'styles';
                    }

                    if (/jpg|jpeg|png|webp|svg|gif|avif/.test(extType)) {
                        extType = 'images';
                    }

                    return `assets/${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: 'assets/scripts/main-[hash].js',
                entryFileNames: 'assets/scripts/index-[hash].js',
            },
        },
        emptyOutDir: false,
        minify: true,
    },
});