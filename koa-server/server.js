const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const Session = require('koa-session');
const KoaBetterBody = require('koa-better-body');
const ejs = require('koa-ejs');

const db = require('./libs/dataBase');
const Static = require('./routers/static');
const config = require('./config');


const app = new Koa();
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.throw(500, 'Internal Server Error');
  }
});

app.keys = fs.readFileSync('./.keys').toString().split('\n');
app.context.db = db;
app.context.config = config;
app.use(KoaBetterBody({
  uploadDir: config.UPLOAD_DIR
}));
app.use(Session({
  maxAge: 20 * 60 * 1000,
  renew: true
}, app));


ejs(app, {
  root: path.resolve(__dirname, 'template'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false,
});

const router = new Router();

app.use(router.routes());
Static(router);
router.use('/', require('./routers/www'));
router.use('/api', require('./routers/api'));
router.use('/admin', require('./routers/admin'));


app.listen(config.PORT, () => {
  console.log(`http://localhost:${config.PORT}/`);
});

