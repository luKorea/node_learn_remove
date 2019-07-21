const express = require('express');
const bodyParser = require('./libs/body-parser');

let app = express();


app.use(bodyParser);

app.post('/reg', (req, res, next) => {
  console.log(req.body);
  res.send('登录成功');
});

app.listen(3000, () => {
  console.log(`server running at http://localhost:3000`);
});
