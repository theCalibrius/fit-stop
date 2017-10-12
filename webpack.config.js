var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/src/index.jsx',
    app: './client/src/index.jsx'
},

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname + '/dist'),
    publicPath: '/'
  }, 
 devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },


 plugins: [ 
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Fity stop',
        template: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
  module: {
  rules: [
    {
      test: /\.jsx$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env','react']
        }
      }
    },
    {
      test: /\.css$/,
      use: [
      'style-loader',
        'css-loader'

      ]

    },
    {
      test: /\.(jpg|png|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
        //    publicPath: 'img/'
          }
        }
      ]
    }
  ]
}
}