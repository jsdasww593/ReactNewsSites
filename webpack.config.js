var webpack = require('webpack');
var path = require('path');

const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
  devServer:{
    historyApiFallback:true,
  },
  //对项目大小进行评测
  // performance:{
  //    hints:'warning',
  //    maxEntrypointSize:100000,
  //    maxAssetSize:450000  
  // },
  context: path.join(__dirname),
  entry:'./src/js/root.js',
  //项目最后打包压缩阶段
  // entry:{
  //   app:"./src/js/root.js",
  //   vendor:['react']
  // },
  //代码压缩后项目的源码调试方法
  // devtool:'source-map', 
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs'],
        },
      },
      { 
        test: /\.css$/, 
        use: ['style-loader','css-loader']
      },
      { 
        test: /\.less$/,
        use: ['style-loader','css-loader','less-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          formatter: require('eslint-friendly-formatter')
        },
      },  
    ],
  },
  output: {
    path: __dirname,
    filename:'./src/bundle.js',
  },
  //项目最后打包压缩阶段
  // plugins:[
  //   new BabiliPlugin(),
  //   new webpack.optimize.CommonsChunkPlugin({
  //      name:'vendor'
  //   })
  // ],
};
