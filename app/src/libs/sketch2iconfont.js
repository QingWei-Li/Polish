'use strict'
const sketch = require('./sketchjs/sketch.js')
const webfontsGenerator = require('webfonts-generator')
const jetpack = require('fs-jetpack')
const app = global.require('remote').require('app')
const validate = require('./validate')

export default {
  initialize (file) {
    return this.parse(file)
  },

  parse (file) {
    return new Promise((resolve, reject) => {
      validate.hasSketchToolCmd().then(() => {
        this.sketch2svg(file).then((stdout, stderr) => {
          this.svg2iconfont().then(path => {
            resolve(path)
          }).catch(err => reject(err))
        }).catch(err => reject(err))
      }).catch(() => reject('please install sketchtool cli'))
    })
  },

  sketch2svg (file) {
    const _this = this
    this.outputPath = `${file.path}/../polish_export_${file.name.slice(0, file.name.lastIndexOf('.'))}/`

    return new Promise((resolve, reject) => {
      sketch.export(file.path, {
        type: 'artboards',
        formats: 'svg',
        scales: '1.0',
        output: _this.outputPath
      }, (err, stdout, stderr) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(stdout, stderr)
        }
      })
    })
  },

  svg2iconfont () {
    let iconfontPath = `${this.outputPath}iconfont/`

    return new Promise((resolve, reject) => {
      webfontsGenerator({
        files: jetpack.find(this.outputPath, {matching: '*.svg'}),
        dest: iconfontPath,
        htmlTemplate: `${app.getAppPath()}/src/static/templates/html.hbs`,
        cssTemplate: `${app.getAppPath()}/src/static/templates/css.hbs`,
        html: true
      }, function (error) {
        if (error) {
          return reject(error)
        }
        resolve(iconfontPath + 'iconfont.html')
      })
    })
  }
}
