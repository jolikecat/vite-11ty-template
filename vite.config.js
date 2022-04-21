import { defineConfig } from "vite";
import glob from "glob";
const path = require('path');

export default defineConfig({
    build: {
        outDir: './dist',
        rollupOptions: {
            input: Object.fromEntries(
                glob
                    .sync("{scripts,styles}/**/*.{js,scss}", {
                        ignore: "**/_*.{js,scss}",
                        cwd: `./assets`,
                    })
                    .map((file) => {
                        const { dir, name } = path.parse(file);
                        return [`${dir}/${name}`, path.resolve('assets', file)];
                    })
            ),
            output: {
                entryFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
                chunkFileNames: `assets/scripts/vendor.js`,
            }
        },
        emptyOutDir: false,
        minify: false,
    },

    css: {
        postcss: {
            plugins: [require("autoprefixer")],
        },
    },
});