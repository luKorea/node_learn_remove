// TODO koa
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaBetterBody = require('koa-better-body');
const static = require('koa-static');
const session = require('koa-session');

const {HTTP_PORT} = require('./config/config.dev');
const keys = require('./config/keys');
const db = require('./lib/dataBase');
console.log(db);

const app = new Koa();
let router = new Router();


// 原型链上添加属性
app.context.title = 'Development';
app.context.db = db;
app.keys = keys;

app.use(async (ctx, next) => {
  const start = Date.now();
  try {
    await next();
  }catch (e) {

  }
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.get('/testCookie', async ctx => {
  ctx.cookies.set('username', 'korea', {
    maxAge: 14 * 86400 * 1000,
    signed: true
  });
  ctx.body = 'cookie设置';
});

router.get('/testSession', async ctx => {
  if (!ctx.session['view']) {
    ctx.session['view'] = 0;
  }
  ctx.session['view']++;
  ctx.body = `第${ctx.session['view']}次访问`;
});

router.get('/sql', async ctx => {
  let data = await ctx.db.query('select * from user');
  ctx.body = data;
});


app.use(bodyParser());
app.use(koaBetterBody({uploadDir: './static/upload/'}));
app.use(session({
  maxAge: 20 * 60 * 1000, // 有效期
  renew: true // 自动续期
}, app));

router.use('/user', require('./routers/user'));
router.use('/login', require('./routers/login'));
router.use('/news/:id', require('./routers/news'));
router.all('*', async (ctx, next) => {
  try {
    await next();
  }catch (e) {
    ctx.body = '路由出现问题！！！';
  }
});
// TODO 路由配置
let staticRouter = new Router();
staticRouter.all(/(\.jpg|\.png|\.gif)$/i, static('./static', {
  maxage: 60 * 86400 * 1000
}));
staticRouter.all(/(\.css)$/i, static('./static', {
  maxage: 86400 * 1000
}));
staticRouter.all(/(\.html|\.htm|\.shtml)$/i, static('./static', {
  maxage: 20 * 86400 * 1000
}));
staticRouter.all('', static('./static', {
  maxage: 30 * 86400 * 1000
}));
app.use(router.routes());
app.use(staticRouter.routes());


app.listen(HTTP_PORT, () => {
  console.log(`server running at http://127.0.0.1:${HTTP_PORT}/`);
});
