import fs from 'fs';
import path from 'path';
import { defineConfig } from "vite";
import { eleventyPlugin } from "./plugins/vite-plugin-eleventy";
import checkerPlugin from 'vite-plugin-checker';

function getScssFiles(dir) {
    const scssFiles = [];
    const files = fs.readdirSync(dir);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            scssFiles.push(...getScssFiles(filePath));
        } else if (/^[^_].*\.scss$/.test(file)) {
            scssFiles.push(filePath);
        }
    }

    return scssFiles;
}

const scssFileList = getScssFiles(path.resolve(__dirname, './src/'));

const manualChunksFiles = {};
for (let i = 0; i < scssFileList.length; i++) {
    const file = scssFileList[i];
    const relativePath = path.relative(path.resolve(__dirname, './src/'), file);
    const key = path.dirname(relativePath);
    manualChunksFiles[key] = [path.resolve(__dirname, './src/' + relativePath)];
}

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
            baseDir: '/'
        }),
    ],

    appType: 'mpa',

    server: {
        port: '3000'
    },

    build: {
        outDir: '../dist/',
        assetsInlineLimit: 0,
        rollupOptions: {
            output: {
                manualChunks: manualChunksFiles,
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