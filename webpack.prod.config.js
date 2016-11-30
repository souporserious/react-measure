var path = require('path');
var webpack = require('webpack');
var banner = require('./webpack.banner');
var TARGET = process.env.TARGET || null;

var externals = {
  'react': {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
  },
  'resize-observer-polyfill': {
    root: 'ResizeObserver',
    commonjs2: 'resize-observer-polyfill',
    commonjs: 'resize-observer-polyfill',
    amd: 'resize-observer-polyfill'
  },
  'get-node-dimensions': {
    root: 'getNodeDimensions',
    commonjs2: 'get-node-dimensions',
    commonjs: 'get-node-dimensions',
    amd: 'get-node-dimensions'
  }
};

var config = {
  entry: {
    index: './src/react-measure.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-measure.js',
    sourceMapFilename: 'react-measure.sourcemap.js',
    library: 'Measure',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: externals
};

if (TARGET === 'minify') {
  config.output.filename = 'react-measure.min.js';
  config.output.sourceMapFilename = 'react-measure.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'ReactDOM', 'elementResizeDetectorMaker', 'getNodeDimensions', 'Measure']
    }
  }));
}

module.exports = config;
