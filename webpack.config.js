const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'app': './app.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: [
          'es2015',
          'react'
        ],
        plugins: []
      },
      include: [
        path.resolve(__dirname, 'app')
      ]
    }, {
      test: /\.json$/,
      loader: "json-loader"
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new BabiliPlugin()
  ],
  resolve: {
    modules: [
      path.join(process.cwd(), 'app'),
      'node_modules'
    ],
    extensions: ['.js', '.json']
  },
  devtool: false
};