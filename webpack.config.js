const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
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
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.jsx', '.js']
  }
};
