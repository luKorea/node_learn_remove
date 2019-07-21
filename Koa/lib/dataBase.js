const Mysql = require('mysql');
const co = require('co-mysql');
const {user, password, database, host, port} = require('../config/db');

// 建立连接池
let connect = Mysql.createPool({host, user, password, database, port});
// 异步链接数据库
let db = co(connect);

module.exports = db;
