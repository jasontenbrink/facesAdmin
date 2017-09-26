var webpack = require('webpack');

module.exports = {
  entry: 
  {
    app:'./src/index.js'
  },
  output: {
    path: __dirname + '/dist'
    ,filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.jpg$/,
        loader: "url-loader"
      }
    ]
  }
  // ,plugins: [
  //       new webpack.optimize.UglifyJsPlugin({
  //         // sourceMap: true,
  //         compress:{
  //           warnings: false
  //         }
  //       })
  //   ]
  
  ,devtool: 'eval-source-map' 
  // ,devtool: 'cheap-module-source-map' //use this for prod
}
