const path = require('path');
module.exports={
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PASS: '123456',
  DB_NAME: 'cpts',
  PORT: 8088,
  HTTP_ROOT: 'http://localhost:8088',
  UPLOAD_DIR: path.resolve(__dirname, './static/upload')
};
