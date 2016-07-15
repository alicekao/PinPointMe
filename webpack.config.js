
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['stage-1']
      }
    }]
  },
  devTool: 'eval',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};