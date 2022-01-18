var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var webpack = require('webpack');
module.exports = {
  'entry': {
    // your entry file file (entry.ts or entry.js)
    'main': ['./src/js']
  },
  'output': {
    'path': path.resolve(__dirname, 'build'),
    'filename': '[name]-app.js'
  },
  'module': {
    'loaders': [
      // ts-loader: convert typescript (es6) to javascript (es6),
      // babel-loader: converts javascript (es6) to javascript (es5)
      {
        'test': /\.tsx?$/,
        'loaders': ['babel-loader','ts-loader'],
        'exclude': [/node_modules/,nodeModulesPath]
      },
      // babel-loader for pure javascript (es6) => javascript (es5)
      {
        'test': /\.(jsx?)$/,
        'loaders': ['babel-loader', 'source-map-loader'],
        'exclude': [/node_modules/,nodeModulesPath]
      }
    ]
  },
  'plugins': [],
  'resolve': {
    'extensions': ['.js', '.jsx', '.ts', '.tsx']
  }
};
