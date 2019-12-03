const url = require('url')
//  query 参数是一个对象
let URL = url.parse('http://www.baidu.com?name=korea&age=20', true);
console.log(URL);