module.exports = {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
