const path = require('path');
const fs = require('fs');

const { DefinePlugin } = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// some plugins are conditionally-loaded as they are also conditionally used.

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const isLiveReload = !!argv.liveReload;

  let publicPath = '/';
  if (env.PUBLIC_PATH) {
    // if we have an array, it means we've probably overriden env in the CLI
    // from a predefined env in a yarn/npm script
    if (Array.isArray(env.PUBLIC_PATH)) {
      // so we take the last one
      publicPath = env.PUBLIC_PATH[env.PUBLIC_PATH.length - 1];
    } else {
      publicPath = env.PUBLIC_PATH;
    }
  }

  const config = {
    context: __dirname,
    entry: [path.resolve(__dirname, 'src/index.tsx')],
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath,
      filename: 'app.[hash:6].js',
      chunkFilename: '[name].[chunkhash:6].js',
    },
    devtool: (() => {
      if (isLiveReload) return 'inline-sourcemap';
      if (isDev) return 'eval-source-map';
      // else, prod
      return 'source-map';
    })(),
    resolve: {
      extensions: ['.tsx', '.jsx', '.js', '.ts'],
      alias: {
        // Deopts here, because we're not on track with React's versions anymore
        // react: path.resolve('./node_modules/react'),
        // 'react-dom': path.resolve('./node_modules/react-dom'),
        // 'react-router-dom': path.resolve('./node_modules/react-router-dom'),
      },
      symlinks: false,
    },
    // MODULE
    module: {
      // JavaScript and Typescript files
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules\/((?!protvista-uniprot).*)/,
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
            fs.realpathSync(
              `${__dirname}/node_modules/@geneontology/ribbon/es`
            ),
            fs.realpathSync(
              `${__dirname}/node_modules/interaction-viewer/styles`
            ),
            fs.realpathSync(`${__dirname}/node_modules/molstar/build/`),
            path.resolve(__dirname, 'src'),
          ],
          use: [
            {
              // loader: isLiveReload
              //   ? 'style-loader'
              //   : MiniCssExtractPlugin.loader,
              // NOTE: deoptimising this because of issue with Google indexing
              loader: 'style-loader',
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
          include: [
            path.resolve(__dirname, 'node_modules/protvista-datatable'),
            path.resolve(__dirname, 'node_modules/protvista-uniprot'),
          ],
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
    // END MODULE
    stats: {
      children: false,
    },
    // PLUGINS
    plugins: [
      !isLiveReload &&
        new (require('clean-webpack-plugin').CleanWebpackPlugin)(),
      new HtmlWebPackPlugin({
        template: `${__dirname}/index.html`,
        filename: 'index.html',
      }),
      !isDev &&
        new HtmlWebPackPlugin({
          template: `${__dirname}/404.html`,
          filename: '404.html',
        }),
      new DefinePlugin({
        BASE_URL: JSON.stringify(publicPath),
        LIVE_RELOAD: JSON.stringify(isLiveReload),
      }),
      !isLiveReload &&
        new (require('workbox-webpack-plugin').InjectManifest)({
          swSrc: `${__dirname}/src/service-worker/service-worker.ts`,
          // TODO: remove following line whenever we manage to reduce size of entrypoint
          maximumFileSizeToCacheInBytes: 1024 * 1024 * 50,
          dontCacheBustURLsMatching: /\.[\da-f]{6}\.[\w]{2,5}$/i,
          // exclude from precaching because one browser will never need all fonts
          // formats at the same time, will cache later whichever is actually used
          exclude: [/fonts/],
        }),
      !isLiveReload &&
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
          analyzerMode: 'disabled',
          generateStatsFile: true,
          statsOptions: { source: false },
        }),
      !isLiveReload &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash:6].css',
          chunkFilename: '[id].[contenthash:6].css',
        }),
      !isDev &&
        new CopyPlugin({
          patterns: [{ from: 'sitemap.txt' }],
        }),
    ].filter(Boolean),
    // END PLUGINS
  };

  if (isLiveReload) {
    config.devServer = {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      host: 'localhost',
      port: 0,
      historyApiFallback: true,
    };
  }

  if (!isDev) {
    config.optimization = {
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
    };
  }

  return config;
};
