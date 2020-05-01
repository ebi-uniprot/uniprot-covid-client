const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: [path.resolve(__dirname, 'src/index.tsx')],
  output: {
    filename: 'app.[hash:6].js',
    chunkFilename: '[name].[chunkhash:6].js',
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-router-dom': path.resolve('./node_modules/react-router-dom'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
        include: [
          // We use realpathSync otherwise doesn't work with symlinks
          fs.realpathSync(`${__dirname}/node_modules/litemol/dist/css`),
          fs.realpathSync(`${__dirname}/node_modules/@geneontology/ribbon/es`),
          fs.realpathSync(
            `${__dirname}/node_modules/interaction-viewer/styles`
          ),
          path.resolve(__dirname, 'src'),
        ],
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.(t|j)sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: [path.resolve(__dirname, 'node_modules/litemol/dist/fonts')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:6].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'node_modules/protvista-datatable')],
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${__dirname}/index.html`,
      filename: 'index.html',
    }),
    new InjectManifest({
      swSrc: `${__dirname}/src/service-worker/service-worker.ts`,
      // TODO: remove following line whenever we manage to reduce size of entrypoint
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 10,
      // comment/uncomment following line to toggle log messages
      mode: 'development',
      dontCacheBustURLsMatching: /\.[\da-f]{6}\.[\w]{2,5}$/i,
    }),
  ],
};
