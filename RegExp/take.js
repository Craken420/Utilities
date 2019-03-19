let rgx = require('./patterns')

module.exports.intls = {
    objBtwnLowScripts: txt => (rgx.intls.objBtwnLowScripts.test(txt)) ? txt.match(rgx.intls.objBtwnLowScripts) : false,
    untilAbbreviatObj: txt => {
        if (rgx.intls.untilAbbreviatObj.test(txt)) {
            return txt.match(rgx.intls.untilAbbreviatObj)
        } else {
            return false
        }
    },
    comp: {
        byName: (nameComp, txt) => {
            if (rgx.make.intls.comp.byName(nameComp).test(txt)) {
                return txt.match(rgx.make.intls.comp.byName(nameComp))
            } else {
                false
            }
        },
        byNameFile: (nameComp, txt) => {
            if (rgx.make.intls.comp.byNameFile(nameComp).test(txt)) {
                return txt.match(rgx.make.intls.comp.byNameFile(nameComp))
            } else {
                false
            }
        },
        head: txt => (rgx.intls.comp.head.test(txt.replace(/^/, '\n'))) ? txt.replace(/^/, '\n').match(rgx.intls.comp.head) : false,
        nameFile: txt => rgx.intls.comp.nameFile.test(txt) && txt.match(rgx.intls.comp.nameFile),
        outSide: (nameComp, txt) => {
            if (rgx.make.intls.comp.outSide(nameComp).test(txt)) {
                return txt.match(rgx.make.intls.comp.outSide(nameComp))
            } else {
                return false
            }
        }
    },
    field: {
        content: (field, txt) => {
            if (rgx.make.intls.field.content(field).test(txt)) {
                return txt.match(rgx.make.intls.field.content(field)).join('')
            }
        },
        full: txt => (rgx.intls.field.full.test(txt)) ? txt.match(rgx.intls.field.full) : false,
        name: txt => (rgx.intls.field.name.test(txt)) ? txt.match(rgx.intls.field.name) : false,
    }
}

module.exports.mix = {
}

module.exports.paths = {
    ext: txt => {
        if (rgx.paths.ext.test(txt)) {
            return txt.match(rgx.paths.ext).join('')
        } else {
            return false
        }
    },
    nameFile: txt => txt.replace(rgx.paths.file, '')
}

module.exports.sql = {
}
