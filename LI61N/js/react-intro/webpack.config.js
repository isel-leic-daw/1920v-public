module.exports = {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    port: 9000,
    proxy: {
      '/examples': 'http://localhost:8080'
    },
    historyApiFallback: true
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
