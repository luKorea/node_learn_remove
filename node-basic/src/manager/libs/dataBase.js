const Mysql = require('mysql');
const co = require('co-mysql');
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE} = require('../config');

// 建立连接池
let connect = Mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
});
// 异步链接数据库
let db = co(connect);

module.exports = db;
