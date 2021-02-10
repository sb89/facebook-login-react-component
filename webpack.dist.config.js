module.exports = {
  resolve: {extensions: ['.js','.jsx']},

  entry: './src/index.js',

  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, use: ['css-loader', 'postcss-loader', 'sass-loader']}
    ]
  },

  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
      umd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
      umd: "react-dom",
    },
  },

  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'facebook-login-react-component'
  }
};