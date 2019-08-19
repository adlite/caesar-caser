import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'umd',
    name: 'CaesarCaser',
    exports: 'default',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};