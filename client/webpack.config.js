const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/public');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    port: 9000,
    historyApiFallback: true, // navigation
    proxy: [
      {
        context: () => true,
        target: 'http://localhost:8000',
        secure: false,
      },
    ],
  },
  // devtool: 'source-map',
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',

            options: {
              minimize: true,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 10000,
    maxAssetSize: 10000,
    hints: false,
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'CashOverflow',
        template: `${__dirname  }/src/index.html`, // create index.html with js script
        inject: 'body',
        filename: 'index.html',
      },
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
        chunkFilename: '[id][hash].css',
      }),
      new UglifyJsPlugin({ sourceMap: true }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ),
  ],
};
