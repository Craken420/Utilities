const code = require('../../Mix/Coding/codingFile')
const duplex = require('../../Mix/Array/duplicate')
const { isNewOrExist } = require('./isNewOrExist')
const take = require('../../RegExp/take')

module.exports.addField = (nameCmp, newfields, toFile) => {

    let olderComp = take.intls.comp.byName(
        nameCmp.join(''),
        code.getTxtInOriginCoding(toFile).replace(/^\n+/gm, '\n')
    )

    if (olderComp) {

        olderComp =  duplex.del(olderComp)

        if (olderComp.length != 0) {
            return isNewOrExist(newfields, olderComp[0])
        }
    }
}
