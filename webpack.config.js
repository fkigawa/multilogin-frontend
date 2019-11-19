/*
the path package is used to access the correct directory.
the plugin is used for generating the HTML5 from the script tag in index.html
*/
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/*
The entry point assigns where the front-end should start.
The output assigns where all the javascript should be bundled.
The public path assigns where the application endpoints exist.

The module rules are in place to tell the application how to bundle different kinds of files.
The historyApiFallback exists to align the url of the app with the correct visual interface.
*/
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
