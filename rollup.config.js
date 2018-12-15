import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

const getBabelOptions = ({ useESModules }) => ({
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  plugins: [['@babel/plugin-transform-runtime', { useESModules }]],
})

const isExternal = id => !id.startsWith('.') && !id.startsWith('/')

const input = './src/index.js'

const umd = {
  input,
  output: {
    file: 'dist/index.umd.js',
    format: 'umd',
    name: 'ReactMeasure',
    globals: {
      react: 'React',
    },
  },
  external: ['react', 'prop-types'],
  plugins: [resolve(), babel(getBabelOptions({ useESModules: true }))],
}

const es = {
  input,
  output: { file: pkg.module, format: 'es' },
  external: isExternal,
  plugins: [babel(getBabelOptions({ useESModules: true }))],
}

const cjs = {
  input,
  output: { file: pkg.main, format: 'cjs' },
  external: isExternal,
  plugins: [babel(getBabelOptions({ useESModules: false }))],
}

export default [umd, es, cjs]
