const fs = require('fs')

exports.deleteEmptyFile = (pathFile) => {
    if(!fs.readFileSync(pathFile).toString()) {
        console.log('Delete: ', pathFile.replace(/.*\\|.*\//g, ''))
        fs.unlinkSync(pathFile)
        return true
    } else {
        false
    }
}
