var path = require('path')

module.exports = {
  entry: {
    main: './src/index.js',
    redirect: './src/redirect.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
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
