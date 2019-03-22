const fs = require('fs')

exports.asComp = (pathFile) => /^\[.*?\]$/gm.test(fs.readFileSync(pathFile).toString())
