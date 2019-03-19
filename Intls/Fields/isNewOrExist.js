const take = require('../../RegExp/take')

module.exports.isNewOrExist = (fields, txt) => {

    let crashField = []
    let newField = []

    fields.forEach(field => {

        let nameField = take.intls.field.name(field)

        if (nameField) {
            if (new RegExp (`^${nameField.join('')}=`, `m`).test(txt)) {
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
