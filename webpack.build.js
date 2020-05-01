const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (_env, argv) => {
  const isDev = argv.mode === 'development';
  return merge(common, {
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: isDev ? '/' : '/uniprot-website/',
    },
    optimization: {
      runtimeChunk: true,
      // when updating webpack check this URL to adapt the different default
      // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        cacheGroups: {
          franklin: {
            test: /[\\/]node_modules[\\/]franklin-sites[\\/]/,
            name: 'franklin',
            chunks: 'all',
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
          },
          litemol: {
            test: /[\\/]node_modules[\\/](litemol)[\\/]/,
            name: 'litemol',
            chunks: 'all',
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'default-vendors',
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    devtool: isDev ? 'eval-source-map' : 'none',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: `${__dirname}/404.html`,
        filename: '404.html',
      }),
      new webpack.DefinePlugin({
        BASE_URL: JSON.stringify(isDev ? '/' : '/uniprot-website/'),
        LIVE_RELOAD: JSON.stringify(false),
      }),
      new InjectManifest({
        swSrc: `${__dirname}/src/service-worker/service-worker.ts`,
        // TODO: remove following line whenever we manage to reduce size of entrypoint
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 50,
        dontCacheBustURLsMatching: /\.[\da-f]{6}\.[\w]{2,5}$/i,
        // exclude from precaching because one browser will never need all fonts
        // formats at the same time, will cache later whichever is actually used
        exclude: [/fontello/],
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsOptions: { source: false },
      }),
    ],
  });
};
