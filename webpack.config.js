var path = require('path');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname + '/dist'),
    publicPath: '/dist'
  }, 
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