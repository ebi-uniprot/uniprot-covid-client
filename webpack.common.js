const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: __dirname,
  entry: [path.resolve(__dirname, 'src/index.tsx')],
  output: {
    filename: 'app.[hash:6].js',
    chunkFilename: '[name].[chunkhash:6].js',
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
  },
  module: {
    // JavaScript and Typescript files
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Stylesheets
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
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      // SVGs
      {
        test: /\.svg$/i,
        issuer: /\.(t|j)sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
      // Fonts
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
      // SVGs from protvista-datatable
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'node_modules/protvista-datatable')],
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:6].[ext]',
            },
          },
        ],
      },
    ],
  },
  stats: {
    children: false,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${__dirname}/index.html`,
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:6].css',
      chunkFilename: '[id].[contenthash:6].css',
    }),
  ],
};
