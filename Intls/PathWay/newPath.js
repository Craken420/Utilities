const change = require('../../RegExp/change')
const cls = require('../../RegExp/cls')
const take = require('../../RegExp/take')
const rgx = require('../../RegExp/patterns')

exports.espToMavi = pathFile => {
    return change.mix.lastPointToLowScript(
        pathFile.replace(rgx.paths.ext, cls.paths.allUntilExt(pathFile).toUpperCase())
    ) + '_MAVI.esp'
}

exports.maviToEsp = pathFile => {

    let nameFile = cls.paths.rootFile(pathFile)

    if (rgx.intls.objBtwnLowScripts.test(nameFile)){

        let newPath = change.mix.lastLowScriptToPoint(
            cls.intls.afterAbbreviatObj(
                cls.paths.ext(
                    nameFile
                )
            )
        )

        return newPath.replace(rgx.paths.ext, cls.paths.allUntilExt(newPath).toLowerCase())

    } else {
        return cls.paths.rootFile(pathFile).replace(/(\_|\.).*/g, '')
    }
}
