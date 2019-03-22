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

module.exports.nameFile= (comp) => {
    return comp.replace(/(?<=\[.*?)\/.*\]$[^]*/gm, '').replace(/^\[/, '')
    // if (comp) {
    //     if (take.intls.comp.head(comp)) {

    //         let nameFile = take.intls.comp.nameFile(
    //             '[' + take.intls.comp.head(comp).join('') + ']'
    //         )

    //         if (nameFile) return nameFile

    //     } else false
    // } else {
    //     false
    // }
}