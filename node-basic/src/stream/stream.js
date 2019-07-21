const fs = require('fs');

const rs = fs.createReadStream('stream1.txt');
const ws = fs.createWriteStream('stream2.txt');

rs.pipe(ws);
rs.on('error', err => {
  console.log(err);
});

ws.on('finish', () => {
  console.log('写入完成');
});
