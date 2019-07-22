const Koa = require('koa');
const ejs = require('koa-ejs');
const path = require('path');
const Router = require('koa-router');


const app = new Koa();
const router = new Router();

ejs(app, {
  root: path.resolve(__dirname, 'template/ejs/'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false,

});
app.use(async ctx => {
  await ctx.render('index', {
    name: '名字',
    list: ['korea', 'demo', 'mike', 'Join']
  })
});
app.use(router.routes());


app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
