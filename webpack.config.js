module.exports = {
  // 找了一天的巨坑 :)
  target: 'atom',
  entry: {
    app: './app/src/main.js'
  },
  output: {
    path: './app/build',
    publicPath: '/app/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.(png|jpg)$/, loader: 'file' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=10000'}
    ]
  }
}
