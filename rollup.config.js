import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import {terser} from 'rollup-plugin-terser'

export default [
    {
        external: ['vue'],
        input: 'src/main.js',
        output: [
            // Keep the bundle as an ES module file
            {file: 'dist/vuetning.js', format: 'es'},
            {file: 'dist/vuetning.min.js', format: 'es', plugins: [terser()]},
            // Universal Module Definition, works as amd, cjs and iife all in one
            {file: 'dist/vuetning.umd.js', format: 'umd', name: 'Vuetning', globals: {vue: 'Vue'}},
            {file: 'dist/vuetning.min.umd.js', format: 'umd', name: 'Vuetning', globals: {vue: 'Vue'}, plugins: [terser()]},
        ],
        plugins: [
            css(),
            vue({css: false}),
            peerDepsExternal()
        ],
        treeshake: 'smallest',
    }
]
