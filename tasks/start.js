const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
const electron = require('electron-prebuilt')
const childProcess = require('child_process')
const devConfig = Object.create(webpackConfig)
var watcher

const runApp = function () {
  const app = childProcess.spawn(electron, ['./app'], {
    stdio: 'inherit'
  })

  app.on('close', function (code) {
    // User closed the app. Kill the host process.
    watcher.close()
  })
}

// webpack
const compiler = webpack(devConfig)
watcher = compiler.watch({}, function (err, stats) {
  if (err) {
    console.log(err)
  }

  console.log(stats.toString({colors: true}))
})

runApp()
