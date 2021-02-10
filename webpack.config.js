const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  resolve: {extensions: ['.js','.jsx']},
  entry: {
    demo: ['./demo/index.jsx']
  },
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, use: ['css-loader', 'postcss-loader', 'sass-loader']}
    ]
  },
  devServer: {
    contentBase: './demo',
    hot: true,
    https: true
  },
  plugins: [new ESLintPlugin()]
}