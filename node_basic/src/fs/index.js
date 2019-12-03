const fs = require('fs');
const { readFilePromise } = require('./utils');

let FILEPATH = './docs/text.txt'




// mkdir
// fs.mkdir('./docs', (err) => {
//     err ? console.log(err) : console.log('创建文件夹成功') 
// })

// readDir
// fs.readdir('./', (err, files) => {
//     if(err) console.log(err);
//     files.forEach(file => console.log(`文件:${file}`))
// });

// writeFile
// let text = `写入文件`

// fs.writeFile(pathJoin(FILEPATH), text, (err) => {
//     err ? console.log(err) : console.log('文件写入成功')
// })

// readFile
// fs.readFile(pathJoin(FILEPATH), 'utf-8', ((err, data) => {
// err ? console.log(err) : console.log(data)
// }))

//appendFile
// let appendText = `\n你是不是喜欢傻逼`
// fs.appendFile(pathJoin(FILEPATH), appendText, err => {
//     err ? console.log(err) : console.log('文件追加写入成功')
// })

// copyFile
// fs.copyFile(pathJoin(FILEPATH), pathJoin('./docs/text.bak.txt'), err => {
//     err ? console.log(err) : console.log('拷贝文件成功')
// })

// unlink
// fs.unlink(pathJoin(FILEPATH), err => {
//     err ? console.log(err) : console.log('删除文件成功')
// })

readFilePromise('docs/text.bak.txt').then(data => console.log(data))