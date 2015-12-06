'use strict'
var exec = require('child_process').exec

module.exports = {
  hasSketchToolCmd () {
    return new Promise((resolve, reject) => {
      exec('which sketchtool', err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}
