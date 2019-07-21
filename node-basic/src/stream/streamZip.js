const fs = require('fs');
const zlib = require('zlib');

const rs = fs.createReadStream('stream1.txt');
const gz = zlib.createGzip();
const ws = fs.createWriteStream('streamZip.txt.gz');

rs.pipe(gz).pipe(ws);
rs.on('error', err => {
  console.log(err);
});

ws.on('finish', () => {
  console.log('写入完成');
});
