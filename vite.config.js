import {resolve} from 'path'
import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
    build: {
        cssCodeSplit: true,
        lib: {
            entry: resolve(__dirname, 'src/main.js'),
            formats:["umd"],
            name: 'Vuetning',
        },
        minify: 'esbuild',
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    plugins: [Vue()],
})
