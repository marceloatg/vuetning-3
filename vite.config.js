import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    build: {
        cssCodeSplit: true,
        lib: {
            entry: resolve(__dirname, 'src/main.js'),
            fileName: (format) => `vuetning.${format}.js`,
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
    plugins: [vue()],
});
