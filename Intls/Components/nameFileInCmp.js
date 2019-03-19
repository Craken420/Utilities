const take = require('../../RegExp/take')

module.exports.nameFileInComp = (arrayComps) => {
    return arrayComps.map(x => {
        if (x) {
            if (take.intls.comp.head(x)) {

                let nameFile = take.intls.comp.nameFile(
                    '[' + take.intls.comp.head(x).join('') + ']'
                )

                if (nameFile) return nameFile

            } else false
        } else {
            false
        }
    }).join(',').split(',')
}
