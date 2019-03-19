module.exports.del = array => {
    let set = new Set( array.map( JSON.stringify))
    return Array.from(set).map( JSON.parse )
}
