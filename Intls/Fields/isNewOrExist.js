const take = require('../../RegExp/take')
const { adapt } = require('../../RegExp/adapt')

module.exports.isNewOrExist = (fields, txt) => {

    let crashField = []
    let newField = []

    fields.forEach(field => {

        let nameField = take.intls.field.name(field)

        if (nameField) {
            if (new RegExp (`^${adapt.toRegExp(nameField.join(''))}=`, `m`).test(txt)) {
                crashField.push(field)
            } else {
                newField.push(field)
            }
        }
    })
    return {
        crashField: crashField,
        newField: newField
    }
}

module.exports.isNewOrExistPro = (field, txt) => {
    let nameField = take.intls.field.name(field)
    
    if (nameField) {
        if (new RegExp (`^${nameField}=`, `m`).test(txt)) {
            return true
        } else {
            return false
        }
    }
}

