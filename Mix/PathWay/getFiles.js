const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

module.exports.getFiles = async function (dir, ext) {
    const files = await readdir(dir)
    const result= files.map(file => path.resolve(dir, file))
    const filterFiles = await Promise.all(result.filter(
      x => ext.indexOf(path.extname(x)) > -1 && fs.statSync(x).isFile())
    )
    return filterFiles.reduce((a, f) => a.concat(f), [])
}

module.exports.getAllFoldersFiles  = async dir => {
    const subDirs = await readdir(dir)
    const files = await Promise.all(subDirs.map( async subDirs => {
      const result = path.resolve(dir, subDirs)
      return (await stat(result)).isDirectory() ? getAllFoldersFiles(result) : result
    }))
    return files.reduce((a, f) => a.concat(f), [])
}

module.exports.filterFiles = (files, ext) => { 
    if (Array.isArray(ext)) {
        
        return files.filter(
            file => ext.indexOf(
                path.extname(file)
            ) > -1 && fs.statSync(file).isFile()
        )
    }
    else if (typeof ext == 'string') {

        let rgxExt = new RegExp(`${ext.replace(/\./,'\\.')}`, ``)

        return files.filter(
            file => rgxExt.test(file) && fs.statSync(file).isFile()
        )
    } else {
        console.log('Enter an array or string \'.Extension\'')
        return false
    }
}
