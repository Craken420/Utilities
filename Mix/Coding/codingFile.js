const chardet   = require('chardet')
const fs        = require('fs')
const iconvlite = require('iconv-lite')

exports.changeCodignFile = (pathFile, wishCoding) => {
    return iconvlite.decode(fs.readFileSync(pathFile), wishCoding)
}

exports.detectCodingFile = pathFile => chardet.detectFileSync(pathFile)

exports.getTxtInOriginCoding = pathFile => {
    return iconvlite.decode(
        fs.readFileSync(pathFile),
        chardet.detectFileSync(pathFile)
    )
}
