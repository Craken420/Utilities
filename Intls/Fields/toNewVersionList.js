const fs = require('fs')

const code = require('../../Mix/Coding/codingFile')
const cls = require('../../RegExp/cls')
const { toJson } = require('../../Intls/Json/intlsFiletoJson')
const { continueFields } = require('../../Intls/Json/clsContinueFields')
const { changeFieldContent } = require('../../Intls/Fields/changeContent')

function txtToList (stringValue, rgx) {
    stringValue = stringValue.replace(/=/g, '<IGUAL>')
    // console.log(stringValue.replace(/=/g, '<IGUAL>'))
    console.log('rgx: ',rgx)
    return stringValue.split(rgx).filter(Boolean).reduce((previous, current) => {
                return previous + '=' + current + '\n' + current
            },'(Inicio)').replace(/$/,'=(Fin)') + '\n'
}

function createNewVList(txt, field, rgx, file) {

    let obj = continueFields(toJson(txt))

    for (comp in obj) {
        if (obj[comp][field]) {

            if (rgx.test(obj[comp][field])){
                
                return {
                    newList: '\n' + `[${comp}.${field}]` + '\n' + txtToList(obj[comp][field], rgx),
                    changeListContent: changeFieldContent(
                        file,
                        '',
                        field,
                        comp,
                        '(Lista)'
                    )
                }
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
        console.log(file)
        let txt = cls.intls.comments(code.getTxtInOriginCoding(file))

        let objFieldRgx = getFieldAndRgx(options)

        objFieldRgx.forEach(fieldRgx => {

            for (field in fieldRgx) {
                let objNewList = createNewVList(txt, field, fieldRgx[field], file)

                fs.writeFileSync(file,
                    objNewList.changeListContent
                )

                fs.appendFileSync(file,
                    objNewList.newList
                )
            }
        })
    })
}