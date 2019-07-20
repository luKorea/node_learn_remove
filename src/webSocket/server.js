const http = require('http');
const io = require('socket.io');

// 建立http链接
let server = http.createServer((req, res) => {
});

// 建立socket链接
let wServer = io.listen(server);
wServer.on('connection', (sock) => {
  sock.on('add', (num1, num2) => {
    console.log(num1, num2, num1 + num2);
  })
});

server.listen(3000, () => {
  console.log(`http://localhost:3000/`);
});

