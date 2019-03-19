let rgx = require('./patterns')

module.exports.intls = {
    comments: txt => txt.replace(rgx.intls.comments, ''),
    comp: {
        allExcepHeadComp: /(?<=^\[.*?\/.*?\]$)(\n(?!^\[.+?\]).*?$)+/gm
    },
    field: {
    }
}

module.exports.mix = {
}

module.exports.paths = {
    ext: txt => txt.replace(rgx.paths.ext, ''),
}

module.exports.sql = {
}
