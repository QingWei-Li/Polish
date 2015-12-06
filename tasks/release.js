const webpack = require('webpack')
const webpackConfig = require('./../webpack.production.js')
const packager = require('electron-packager')
const jetpack = require('fs-jetpack')
const config = Object.create(webpackConfig)

webpack(config, function (err, stats) {
  if (err) {
    return
  }

  const manifest = jetpack.read(__dirname + '/../package.json', 'json')
  // packager
  packager({
    dir: './app',
    name: manifest.name,
    platform: 'darwin',
    arch: 'x64',
    version: '0.35.4',
    ignore: 'node_modules/',
    overwrite: true
  }, function (err, appPath) {
    if (err) {
      console.log(err)
      return
    }

    console.log(appPath)
  })
})
