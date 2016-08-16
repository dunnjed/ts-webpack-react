var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.js',
    'app': './src/main.tsx'
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.jsx', '.tsx']
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        loader: 'json',
        test: /\.json$/,
        include: [
          /node_modules/
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file',
        query: {
          name: 'assets/[name].[hash].[ext]'
        }
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        //loaders: ["style", "css?sourceMap"] //Use this if not using ExtractTextPlugin loader
        loader: ExtractTextPlugin.extract({notExtractLoader: 'style-loader', loader: 'css-loader'})
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        //loaders: ["style", "css?sourceMap", "sass?sourceMap"] //Use this if not using ExtractTextPlugin loader
        loader: ExtractTextPlugin.extract({notExtractLoader: 'style-loader', loader: 'css-loader?sourceMap!sass-loader?sourceMap'})
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
