const take = require('../../RegExp/take')

module.exports.getComponents = (arrayNames, txt) => {
    return arrayNames.map(x => {
        let olComp = take.intls.comp.byName(
            x,
            txt
        )
        if (olComp) {
            return olComp
        }
    })
}
