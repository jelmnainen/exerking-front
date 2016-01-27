const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const API_URL = process.env.API_URL || 'http://localhost:3000';

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Exerking'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(API_URL)
      }
    }),
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.jsx', '.js']
  }
};
