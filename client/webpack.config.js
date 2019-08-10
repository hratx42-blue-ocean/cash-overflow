const path = require('path');
const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/public');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Green Ocean',
      template: __dirname + '/src/index.html', //create index.html with js script
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: SRC_DIR,
        loader: 'css-loader'
      }
    ]
  },
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    port: 9000,
    historyApiFallback: true, //navigation
    proxy: [
      {
        context: () => true,
        target: 'http://localhost:8000',
        secure: false
      }
    ]
  },
  devtool: 'cheap-eval-source-map', //fast build, super fast rebuilds
  performance: {
    maxEntrypointSize: 10000,
    maxAssetSize: 10000,
    hints: false
  }
};
