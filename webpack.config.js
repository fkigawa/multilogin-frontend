// const path = require('path');
// // import webpack from 'webpack';
// var HtmlWebpackPlugin = require('html-webpack-plugin');
//
// // This is main configuration object.
// // Here you write different options and tell Webpack what to do
// module.exports = {
//   entry: './src/components/app/main.js',
//   output: {
//     path: path.resolve(__dirname, './src/components/app'),
//     filename: 'app.bundle.js',
//     publicPath: "/"
//   },
//
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader'
//       }
//     ]
//   },
//   devServer: {
//     historyApiFallback: true,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//          template: './src/components/app/index.html',
//          filename: './index.html',
//          inject: false
//        }),
//   ],
//   devServer: {    inline: true, hot:false,   contentBase: './src/components/app',    port: 8080  },
//
//   module: {    rules: [      {        test: /\.js$/,        exclude: /node_modules/,        loader: 'babel-loader'      }    ]  }
// };
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/components/app/main.js',
  output: {
    path: path.resolve(__dirname, './src/components/app'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/components/app/index.html'
    })
  ]
};
