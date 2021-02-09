module.exports = {
  entry: {
    demo: ['./demo/index.js']
  },
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, use: ['css-loader', 'postcss-loader', 'sass-loader']}
    ]
  },
  devServer: {
    contentBase: './demo',
    hot: true,
    https: true
  },

}