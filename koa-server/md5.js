const crypto = require('crypto');

let pass = crypto.createHash('md5');
pass.update('124058hg');
console.log(pass.digest('hex'));
