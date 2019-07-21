const path = require('path');
module.exports = {
  // database
  DB_HOST: 'localhost',
  DB_PORT: '3306',
  DB_USER: 'root',
  DB_PASSWORD: '123456',
  DB_DATABASE: 'node_sql',

  // http
  HTTP_PORT: 3000,
  HTTP_ROOT: path.resolve(__dirname, '../static/'),
  HTTP_UPLOAD: path.resolve(__dirname, '../static/upload')
};
