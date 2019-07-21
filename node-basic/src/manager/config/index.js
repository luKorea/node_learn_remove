// TODO  当前进程的信息
const process = require('process');

let mode = (process.env.OS === 'Windows_NT' ? 'dev' : 'prod');
console.log(mode);

module.exports = {
  mode,
  ...(mode === 'dev' ? require('./config.dev') : require('./config.prod'))
};
