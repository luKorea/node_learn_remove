const fs = require('fs')
const path = require('path')
let dirName = path.resolve()


/**
 * @method pathJoin
 * @param filePath {string}
 * @description path join
 */
let pathJoin = (filePath) => {
    return path.resolve(dirName, filePath)
}

/**
 * @author koreaLu
 * @version 1.0.0
 * @method readFilePromise
 * @param pathName {string}
 * @description 读取文件
 */
let readFilePromise = (pathName) => {
    pathName = pathJoin(pathName)
    console.log(pathName)
    return new Promise((resolve, reject) => {
        fs.readFile(pathName, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

/** 
 * @method 'mkdir', 'rmdir', 'readdir', 'readFile', 'copyFile'
 * 
 */
['mkdir', 'rmdir', 'readdir', 'readFile', 'copyFile', 'unlink'].forEach(item => {
    exports[item] = (pathName, copyPath = '') => {
        pathName = pathJoin(pathName)
        copyPath = pathJoin(copyPath)
        return new Promise((resolve, reject) => {
            let arg = [(err, result) => err ? reject(err) : resolve(result || '')]
            item === 'readFile' ? arg.unshift('utf-8') : null
            item === 'copyFile' ? arg.unshift(copyPath) : null
            fs[item](pathName, ...arg)
        })
    }
})
// ['writeFile', 'appendFile'].forEach(item => {
//     exports[item] = (pathName, content) => {
//         pathName = pathJoin(pathName)
//         if(typeof content !== 'string') {
//             content = JSON.stringify(content)
//         }
//         return new Promise((resolve, reject) => {
//             let arg = [content, 'utf-8', (err, result) => err ? reject(err) : resolve(result || '')]
//             fs[item](pathName, ...arg)
//         })
//     }
// })

module.exports = {
    readFilePromise,
    pathJoin
}