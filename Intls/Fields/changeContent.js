const rgx = require('../../RegExp/patterns')
const take = require('../../RegExp/take')
const { adapt } = require('../../RegExp/adapt')
const { changeSpecialContent } = require('../../Mix/Text/replaceContent')
const code = require('../../Mix/Coding/codingFile')
const fs = require('fs')
const { isStringOrArray } = require('../../Mix/Verify/isArrayOrString')

function changeFieldInComp (condition, fileContent,
    fieldName, compName, newFieldContent) {
        
    if (new RegExp(`\\[${adapt.toRegExp(compName)}\\]`,`gi`).test(fileContent)) {
        // console.log('\ncompName: ',compName)
        let selectComp = take.intls.comp.byName(compName,fileContent)
        // console.log('\nselectComp: \n',selectComp)
        if (selectComp) {
            fs.appendFileSync('Reporte.txt',
            `------------------------------------------------------------------\n`
            + `***  Deteccion ***\n Componente: \"${compName}\"\n`)
            
            if (rgx.make.intls.field.fullByName(fieldName).test(selectComp.join(''))) {
                
                let fullField = take.intls.field.fullByName(fieldName, selectComp.join(''))
                // console.log('\nfieldName: ',fieldName)
                // console.log('\nfullField: \n',fullField)
                // console.log('\nselectComp: \n',selectComp.join(''))
                if (fullField) {

                    fs.appendFileSync('Reporte.txt',
                    `    --------------------------------\n`
                    + `       Campo: \"${fieldName}\"\n`
                    + `       Extraccion: \"${fullField.join('')}\"\n`)

                    // console.log('\nfullField: \n',fullField)
                    // console.log('\condition: \n',condition)

                    if (condition.test(fullField.join(''))) {
                        // console.log('\nfullField: \n',fullField)
                        let newField = fullField.join('').replace(/(?<=^.*?=).*/gm, '') + newFieldContent
                        // console.log('\newField: \n',newField)
                        fs.appendFileSync('Reporte.txt',
                        `       --------------------------------\n`
                        + `            Campo editado: \"${newField}\"\n`)
                        // console.log(changeSpecialContent(
                        //     selectComp.join(''),
                        //     fullField.join(''),
                        //     newField
                        // ))
                        return changeSpecialContent(
                            fileContent,
                            selectComp.join(''),
                            changeSpecialContent(
                                selectComp.join(''),
                                fullField.join(''),
                                newField
                            )
                        )
                        
                    } else {

                        fs.appendFileSync('Reporte.txt',
                        `------------------------------------------------------------------\n`
                        + `***  Omicion  ***\n`
                        + `------------------------------------------------------------------\n`
                        + `Campo sin cumplir la condicion: \"${condition}\"\n`
                        + `En el Componente: \"${compName}\"\n`)

                        return false
                    }
                }
            } else {

                fs.appendFileSync('Reporte.txt',
                    `------------------------------------------------------------------\n`
                    + `***  Omicion  ***\n`
                    + `No existe el campo: \"${fieldName}\"\n`
                    + `------------------------------------------------------------------\n`)

                return false
            }
        }

    } else {

        fs.appendFileSync('Reporte.txt',
        `------------------------------------------------------------------\n`
        + `***  Omicion  ***\n`
        + `No existe el componente: ${fieldName}\n`
        + `------------------------------------------------------------------\n`)

        return false
    }
}

const changeFieldContent = (file, condition, fieldName, compName, newFieldContent) => {
    // console.log('file: ',file)
    // console.log('condition: ',condition)
    // console.log('fieldName: ',fieldName)
    // console.log('compName: ',compName)
    // console.log('newFieldContent: ',newFieldContent)

    return changeFieldInComp(
            new RegExp(`${condition}$`,`gim`),
            code.getTxtInOriginCoding(file),
            fieldName,
            compName,
            newFieldContent
        )
}

/***
 * 
 * operarCambioEspecial(
 *               archivo,
 *               true,
 *               ['Normal', 'adios'],
 *    'VentanaTipoMarco',
 *    'Forma',
 *    'Sencillo'
 *)
 * 
 ***/
const specialChangeField = (file, forceCondition, condition,
    fieldName, compName, newFieldContent) => {

    if (condition != '') {

        if (isStringOrArray(condition) == 'string') {
            if (forceCondition == true) {

                return changeFieldInComp(
                    new RegExp(`${condition}$`,`gim`),
                    code.getTxtInOriginCoding(file),
                    fieldName,
                    compName,
                    newFieldContent
                )

            } else if (forceCondition == false) {

               return changeFieldInComp(
                    new RegExp(`${condition}`,`gi`),
                    code.getTxtInOriginCoding(file),
                    fieldName,
                    compName,
                    newFieldContent
                )

            } else {

                console.log('Ingresa \"true\" si necesitas una condicion en el texto, \"false\" si no')
                return false
            }

        } else if (isStringOrArray(condition) == 'arreglo') {

            fs.appendFileSync('Reporte.txt',
              `\n-------------------------------------\n`
            + `Determinacion Tipo: Condicion - ${isStringOrArray(condition)}\n`
            + `-----------------------------\n`)

            if (forceCondition == true) {

                let rgxCondition = condition.map(x => {return `(?:${x})`})

                let unionCondition = rgxCondition.join('([^]*|)')

                fs.appendFileSync('Reporte.txt',
                + `condicionCampo: Forzosa\n`
                + `-------------------------\n`
                + `condition: \"${condition}\"\n`
                + `condicionUnida: \"${unionCondition}\n`)

                return changeFieldInComp(
                    new RegExp(`${unionCondition}$`,`gim`),
                    code.getTxtInOriginCoding(file),
                    fieldName,
                    compName,
                    newFieldContent
                )

            } else if (forceCondition == false) {
                let rgxCondition = condition.map(x => {return `(?:${x})`})

                let unionCondition = rgxCondition.join('|')
               
                fs.appendFileSync('Reporte.txt',
                  `\n-------------------------------------\n`
                + `condicionCampo Opcional\n`
                + `------------\n`
                + `condition: \"${condition}\"\n`
                + `condicionUnida: \"${unionCondition}\"\n`)

                return changeFieldInComp(
                    new RegExp(`${unionCondition}`,`gi`),
                    code.getTxtInOriginCoding(file),
                    fieldName,
                    compName,
                    newFieldContent
                )

            } else {

                console.log('Ingresa \"true\" si necesitas una condicion en el texto, \"false\" si no')
                return false
            }
        } else {

            console.log('Objeto desconocido')
            return false
        }
    } else {
        return changeFieldInComp(
            condition,
            code.getTxtInOriginCoding(file),
            fieldName,
            compName,
            newFieldContent
        )
    }
}

module.exports.changeFieldContent = changeFieldContent
module.exports.specialChangeField = specialChangeField