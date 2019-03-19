const fs = require('fs')

module.exports.fileExists = path => {
    try {
        return fs.statSync(path).isFile()
    } catch (e) {
        return false
    }
}
