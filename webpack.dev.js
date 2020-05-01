const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-sourcemap',
  output: {
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    host: 'localhost',
    port: 0,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('/'),
      LIVE_RELOAD: JSON.stringify(true),
    }),
  ],
});
