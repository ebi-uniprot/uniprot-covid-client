const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const common = require('./webpack.common.js');

const publicPath = '/';

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath,
    filename: 'app.[hash].bundle.js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${__dirname}/404.html`,
      filename: '404.html',
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({ BASE_URL: JSON.stringify(publicPath) }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false },
    }),
  ],
});
