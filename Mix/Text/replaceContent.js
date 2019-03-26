const take = require('../../RegExp/take')
const { adapt } = require('../../RegExp/adapt')
const rgx = require('../../RegExp/patterns')

exports.replaceContent =  ( allTxt, txtToReplace,
    txtReplace) => {
  
    if (/(.*?\n){4,}/.test(txtToReplace)) {
        let firstTwoLines = take.mix.firstTwoLines(txtToReplace)
        let lastTwoLines  = take.mix.lastTwoLines(txtToReplace)

        return  allTxt.replace(
                    rgx.make.mix.startUntilEnd(firstTwoLines, lastTwoLines),
                    txtReplace
                )
    } else {
        return allTxt.replace(new RegExp(`${adapt.toRegExp(
            txtToReplace
        )}`, ``), txtReplace)
    }
}


module.exports.changeSpecialContent = ( allTxt, txtToReplace,
    txtReplace) => {
        if(txtToReplace.split('\r\n').length == 1) {
            if (/.{100}/.test(txtToReplace)){
               // console.log('contenidoARemplazar solo tiene una linea mayor a 100 caracteres')
                if (/.{50}/.test(txtToReplace) && /.{50}$/g.test(txtToReplace)) {

                    let firstLine = adapt.toRegExp(txtToReplace.match(/.{50}/).join(''))
                    let lastLine = adapt.toRegExp(txtToReplace.match(/.{50}$/m).join('')).replace(/(\\s)+(\\n)+$/,'')

                    return allTxt.replace(
                        new RegExp(`${firstLine}[^]*${lastLine}`, ``),
                        txtReplace
                    )
                }
            } else {
                //console.log('contenidoARemplazar solo tiene una linea menor a 80 caracteres')
                return  allTxt.replace(
                    new RegExp(`${adapt.toRegExp(
                        txtToReplace
                    )}`, ``),
                    txtReplace
                )
            }
        } else if (txtToReplace.split('\r\n').length <= 3) {
           // console.log('contenidoARemplazar menor a 3 lineas')
            let firstTwoLines = take.mix.firstLine(txtToReplace)
            let lastTwoLines  = take.mix.lastLine(txtToReplace)
    
            return  allTxt.replace(
                        rgx.make.mix.startUntilEnd(firstTwoLines, lastTwoLines),
                        txtReplace
                    )
        } else if (txtToReplace.split('\r\n').length >= 4) {
            //console.log('contenidoARemplazar mayor o igual a 4 lineas')
            let firstTwoLines = take.mix.firstTwoLines(txtToReplace)
            let lastTwoLines  = take.mix.lastTwoLines(txtToReplace)
    
            return  allTxt.replace(
                        rgx.make.mix.startUntilEnd(firstTwoLines, lastTwoLines),
                        txtReplace
                    )
        }
}