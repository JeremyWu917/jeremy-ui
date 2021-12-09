import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import dartSass from 'sass';
import { terser } from "rollup-plugin-terser"

export default {
  input: 'src/lib/index.ts',
  output: [{
    globals: {
      vue: 'Vue'
    },
    name: 'Jeremy',
    file: 'lib/jeremy.js',
    format: 'es',
    plugins: [terser()]
  }, {
    globals: {
      vue: 'Vue'
    },
    name: 'Jeremy',
    file: 'lib/jeremy.umd.js',
    format: 'umd',
    plugins: [terser()]
  },],
  plugins: [
    vue({
      include: /\.vue$/,
    }),
    scss({ include: /\.scss$/, sass: dartSass }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015'
    }),
  ],
}