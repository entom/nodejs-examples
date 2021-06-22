const fs = require('fs')
const path = require('path')

const MB = 1024000;

exports.getFileSize = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                reject()
            } else {
                const size = stats.size;
                if (size / MB < 1) {
                    resolve(`${size / MB * 1024} kB`)
                } else {
                    resolve(`${size / MB} MB`)
                }
            }
        })
    })
}

exports.getFileInfo = (filePath) => {
    return {
        dirname: path.dirname(filePath),
        basename: path.basename(filePath),
        extname: path.extname(filePath),
    }
}

exports.getAbsolutePathFromRelative = (filePath) => {
    return path.resolve(filePath)
}
