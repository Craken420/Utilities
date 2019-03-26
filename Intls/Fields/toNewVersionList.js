const fs = require('fs')

const code = require('../../Mix/Coding/codingFile')
const cls = require('../../RegExp/cls')
const { toJson } = require('../../Intls/Json/intlsFiletoJson')
const { continueFields } = require('../../Intls/Json/clsContinueFields')

function txtToList (stringValue, rgx) {
    return stringValue.split(rgx).filter(Boolean).reduce((valorAnterior, valorActual) => {
                return valorAnterior  + '=' + valorActual + '\n' + valorActual
            },'(Inicio)').replace(/$/,'=(Fin)') + '\n'
}


function createNewVList(txt, field, rgx) {

    let obj = continueFields(toJson(txt))

    for (key in obj) {
        if (obj[key][field]) {

            if (rgx.test(obj[key][field])){

                return '\n' + `[${key}.${field}]` + '\n' + txtToList(obj[key][field], rgx)
            }
        }
    }
}

function getFieldAndRgx (options) {
    return options['field'].map((x,y) =>{
        return { [x] : options['rgx'][y] }
    })
}

module.exports.getNewVList = options => {
    options['files'].forEach(file => {

        let txt = cls.intls.comments(code.getTxtInOriginCoding(file))

        let objFieldRgx = getFieldAndRgx(options)

        objFieldRgx.forEach(fieldRgx => {

            for (field in fieldRgx) {

                fs.appendFileSync(file,
                    createNewVList(txt, field, fieldRgx[field])
                )
            }
        })
    })
}