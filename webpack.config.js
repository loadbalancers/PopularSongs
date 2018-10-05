var path = require('path');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/public/dist');

module.exports = {
  devtool: 'inline-source-map',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR //,
    //publicPath: '/react-client/dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          env: {
            test: {
              presets: ['es2015', 'react']
            }
          }
        }
      },
      /*{
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },*/
      {
        test: /\.css$/,
        use: 'style-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }
        ]
      }
    ]
  }
};
