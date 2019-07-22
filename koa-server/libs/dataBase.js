const Mysql = require('mysql');
const co = require('co-mysql');
const {DB_USER, DB_HOST, DB_NAME, DB_PASS} = require('./../config');

// 建立连接池
let connect = Mysql.createPool({
  host: DB_HOST, 
  user: DB_USER, 
  password: DB_PASS, 
  database: DB_NAME
});
// 异步链接数据库
let db = co(connect);

module.exports = db;
