// TODO Express
const express = require('express');
const bodyParser = require('body-parser');
// 文件上传
const multer = require('multer');
// cookie
const cookieParser = require('cookie-parser');
// session
const cookieSession = require('cookie-session');

let app = express();
let multerObj = multer({dest: './static/upload/'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multerObj.any());
// TODO cookie保护
app.use(cookieParser('demofsdfslkfj'));
// TODO session
app.use(cookieSession({
  keys: ['demo', 'defgsd', 'dfefgsd'],
  maxAge: 20 * 60 * 1000
}));

app.get('/testCookie', (req, res, next) => {
  // console.log(req.cookies);  // 未签名
  console.log(req.signedCookies);  // 签名cookie
  res.cookie('username', 'korea', {
    maxAge: 14 * 86400 * 1000,
    httpOnly: true,
    // secure: true, // https
    signed: true, // 签名
  });
  res.send('测试页面');
});

app.get('/testSession', (req, res) => {
  console.log(req.session);
  if (!req.session['views']) {
    req.session['view'] = 1;
  } else {
    req.session['view']++;
  }
  res.send(`欢迎您第${req.session['view']}次来到本网站`);
});

app.post('/reg', (req, res, next) => {
  console.log(req.body);
  res.send('登录成功');
});
// TODO  文件上传
app.post('/profile', (req, res, next) => {
  console.log(req.files);
  res.send('上传成功');
});

// 处理静太文件
app.use(express.static('./static/'));

app.listen(3000, () => {
  console.log(`server running at http://localhost:3000`);
});
