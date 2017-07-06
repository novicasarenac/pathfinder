const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: join('client/index.html'),
      inject: 'body'
    })
  ]
};
