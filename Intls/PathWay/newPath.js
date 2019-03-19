const change = require('../../RegExp/change')
const cls = require('../../RegExp/cls')
const take = require('../../RegExp/take')

exports.espToMavi = pathFile => change.mix.lastPointToLowScript(
    change.mix.bitTxtToUpper(
        pathFile, take.paths.ext(pathFile)
    )
) + '_MAVI.esp'

exports.maviToEsp = pathFile => {

    let newPath = change.mix.lastLowScriptToPoint(
        take.intls.untilAbbreviatObj(
            cls.paths.ext(
                take.paths.nameFile(pathFile)
            )
        ).join('')
    )
    return change.mix.bitTxtToLower(
        newPath,
        take.paths.ext(newPath)
    )
}
