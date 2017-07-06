var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function join(destination) {
  return path.resolve(__dirname, destination);
}

module.exports = {
  entry: join('client/app.js'),

  output: {
    filename: 'app.js',
    path: join('dist')
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: join('client/index.html'),
      inject: 'body'
    })
  ]
}
