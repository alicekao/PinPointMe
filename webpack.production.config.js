console.log('=====================', __dirname);
module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devTool: 'eval',
  output: {
    filename: 'dist/bundle.js'
  }
};