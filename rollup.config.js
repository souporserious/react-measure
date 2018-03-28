import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

const pkg = require('./package.json')

const isExternal = id => !id.startsWith('.') && !id.startsWith('/')

export default [
  {
    input: './src/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'ReactMeasure',
      globals: {
        react: 'React',
      },
    },
    external: ['react'],
    plugins: [
      nodeResolve(),
      babel({
        exclude: /node_modules/,
      }),
      sizeSnapshot(),
    ],
  },

  {
    input: './src/index.js',
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    external: isExternal,
    plugins: [
      babel({
        runtimeHelpers: true,
        plugins: [
          ['@babel/transform-runtime', { polyfill: false, useBuiltIns: true }],
        ],
      }),
      sizeSnapshot(),
    ],
  },

  {
    input: './src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
    },
    external: isExternal,
    plugins: [
      babel({
        runtimeHelpers: true,
        plugins: [
          [
            '@babel/transform-runtime',
            { polyfill: false, useBuiltIns: true, useESModules: true },
          ],
        ],
      }),
      sizeSnapshot({ treeshake: true }),
    ],
  },
]
